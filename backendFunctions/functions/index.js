const functions = require('firebase-functions');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
const admin = require('firebase-admin');
admin.initializeApp();

const googleSecrets = require("./credentials.json");

const CONFIG_CLIENT_ID = googleSecrets.web.client_id;
const CONFIG_CLIENT_SECRET = googleSecrets.web.client_secret;
const CONFIG_SHEET_ID = '1I9O0hApNYVa02Qn4bv4-dKdj6fMaCrCR28SL1RfXZBk'; // Id fixo, aqui poderíamos pedir para o usuário ou interagir com a api do google drive e recuperando de determinada pasta

const FUNCTIONS_REDIRECT = 'https://us-central1-orcamento-pessoal-85a66.cloudfunctions.net/oauthcallback';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const functionsOauthClient = new OAuth2Client(CONFIG_CLIENT_ID, CONFIG_CLIENT_SECRET,
  FUNCTIONS_REDIRECT);

const dbTokenPath = uid => `usuarios/${uid}/api_tokens`;
let oauthTokens = null;

exports.authgoogleapi = functions.https.onRequest((req, res) => {
  const uid = req.query.uid;
  if (!uid) {
    res.sendStatus(400);
  }
  res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
  res.redirect(functionsOauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    state: JSON.stringify({
      uid
    })
  }));
});

exports.oauthcallback = functions.https.onRequest(async (req, res) => {
  res.set('Cache-Control', 'private, max-age=0, s-maxage=0');
  const code = req.query.code;
  const state = JSON.parse(req.query.state);
  try {
    const { tokens } = await functionsOauthClient.getToken(code);
    await admin.firestore().collection(dbTokenPath(state.uid)).add(tokens);
    return res.status(200).send('Aplicação configurada com suas credenciais. '
      + 'Você pode fechar essa página agora.');
  } catch (error) {
    return res.status(400).send(error);
  }
});

exports.adicionardespesasheet = functions.firestore.document(`usuarios/{userId}/despesas/{despesaId}`).onCreate(
  (snap, context) => {
    const newRecord = snap.data();
    const uid = context.params.userId;
    return adicionarLinhaPromise({
      spreadsheetId: CONFIG_SHEET_ID,
      range: 'A:C',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[newRecord.descricao, newRecord.categoria, newRecord.valor]],
      },
    }, uid);
  });

exports.adicionarreceitasheet = functions.firestore.document(`usuarios/{userId}/receitas/{despesaId}`).onCreate(
  (snap, context) => {
    const newRecord = snap.data();
    const uid = context.params.userId;
    return adicionarLinhaPromise({
      spreadsheetId: CONFIG_SHEET_ID,
      range: 'E:F',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[newRecord.descricao, newRecord.valor]],
      },
    }, uid);
  });

function adicionarLinhaPromise(requestWithoutAuth, uid) {
  return new Promise((resolve, reject) => {
    return obterClientAutorizado(uid).then((client) => {
      if (!client) {
        return reject('Api token não configurado');
      }
      const sheets = google.sheets('v4');
      const request = requestWithoutAuth;
      request.auth = client;
      return sheets.spreadsheets.values.append(request, (err, response) => {
        if (err) {
          console.log(`The API returned an error: ${err}`);
          return reject(err);
        }
        return resolve(response.data);
      });
    });
  });

  async function obterClientAutorizado() {
    if (oauthTokens) {
      return functionsOauthClient;
    }
    const snapshot = await admin.firestore().collection(dbTokenPath(uid)).get();
    if (!snapshot.docs.length) {
      return null;
    }
    oauthTokens = snapshot.docs[0].data();
    functionsOauthClient.setCredentials(oauthTokens);
    return functionsOauthClient;
  }
}
