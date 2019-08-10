export default function adicionarHandlersModal(modal, { botaoFechar, window, bloquearModal } = {}) {
  const abrirModal = function () {
    modal.style.display = "block";
  }

  const fecharModal = function () {
    modal.style.display = "none";
  }

  if (!bloquearModal && (!window || !botaoFechar)) {
    throw new Error('O elemento window e o elemento para o botão fechar não foram definidos');
  }

  if (!bloquearModal) {
    botaoFechar.onclick = function () {
      modal.style.display = "none";
    }
  
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  return {
    abrirModal,
    fecharModal
  };
}