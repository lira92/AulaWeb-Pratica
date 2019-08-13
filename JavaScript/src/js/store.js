import * as firebase from "firebase/app";
import 'firebase/firestore';

export default class storeGenerica {
  constructor(chave) {
    this.chave = chave;
    this.db = firebase.firestore();
  }

  listar(usuarioId) {
    return this.db.collection(`usuarios/${usuarioId}/${this.chave}`).get().then((response) => {
      return response.docs.map((item) => {
        return {
          id: item.id,
          ...item.data()
        }
      })
    });
  }

  adicionar(item, usuarioId) {
    return this.db.collection(`usuarios/${usuarioId}/${this.chave}`).add(item);
  }
}