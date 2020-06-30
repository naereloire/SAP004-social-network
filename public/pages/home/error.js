export default () => {};

export function ErrorDictionary(error) {
  this.error = error;
  this.storageErrorCode = {
    'storage/unknown': 'Ocorreu um erro desconhecido.',
    'storage/object-not-found': 'Nenhum objeto na referência desejada.',
    'storage/bucket-not-found': 'Nenhum intervalo configurado para o Cloud Storage.',
    'storage/project-not-found': 'Nenhum projeto configurado para o Cloud Storage.',
    'O usuário não está autenticado.': 'Faça a autenticação e tente novamente.',
    'storage/unauthorized': 'O usuário não está autorizado a executar a ação desejada.',
    'storage/retry-limit-exceeded':
      'O limite máximo de tempo da operação foi excedido. Envie novamente.',
    'storage/canceled': 'O usuário cancelou a operação.',
    'storage/invalid-url':
      'URL inválido fornecido para refFromURL(). Deve estar no formato: gs://bucket/object ou https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=&ltTOKEN>.',
    'storage/no-default-bucket':
      'Nenhum bucket foi definido na propriedade storageBucket da configuração.',
  };
  this.firestoreErrorCode = {
    'firestore/cancelled': 'cancelado: a operação foi cancelada ',
    'firestore/unknown': 'desconhecido: erro desconhecido ou erro de um domínio de erro diferente.',
    'firestore/deadline-exceeded':
      'prazo excedido: o prazo expirou antes que a operação pudesse ser concluída.',
    'firestore/not-found': 'não encontrado: algum documento solicitado não foi encontrado.',
    'firestore/internal': 'internal: erros internos.',
    'firestore/unavailable': 'indisponível: o serviço está indisponível no momento.',
    'firestore/data-loss': 'perda de dados: perda ou corrupção irrecuperável de dados.',
    'firestore/unauthenticated':
      'não autenticado: a solicitação não possui credenciais de autenticação válidas para a operação.',
  };
  this.authErrorCode = {
    'auth/cors-unsupported': 'Este navegador não é suportado.',
    'auth/email-already-in-use': 'O endereço de e-mail já está em uso por outra conta.',
    'auth/expired-action-code': 'O código de ação expirou.',
    'auth/invalid-user-token':
      'A credencial do usuário não é mais válida. O usuário deve entrar novamente',
    'auth/invalid-auth-event': 'Ocorreu um erro interno',
    'auth/wrong-password': 'A senha é inválida ou o usuário não tem uma senha.',
    'auth/redirect-cancelled-by-user':
      'A operação de redirecionamento foi cancelada pelo usuário antes de finalizar',
    'auth/timeout': 'A operação foi expirada',
    'auth/user-token-expired':
      'A credencial do usuário não é mais válida. O usuário deve fazer o login novamente.',
    'auth/too-many-requests':
      'Bloqueamos todas as solicitações deste dispositivo devido a atividade incomum. Tente novamente mais tarde.',
    'auth/user-not-found': 'Não há nenhum registro de usuário correspondente a este identificador.',
    'auth/user-disabled': 'A conta do usuário foi desabilitada por um administrador.',
    'auth/user-signed-out': '',
    'auth/weak-password': 'A senha deve ter 6 caracteres ou mais.',
    'auth/web-storage-unsupported':
      'Este navegador não é suportado ou cookies e dados de terceiros podem ser desabilitados.',
  };

  this.translate = function callBack(base) {
    let retorno;
    if (base === 'storageErrorCode') {
      retorno = this.storageErrorCode[this.error.code];
    } else if (base === 'firestoreErrorCode') {
      retorno = this.firestoreErrorCode[this.error.code];
    } else {
      retorno = this.authErrorCode[this.error.code];
    }
    return retorno;
  };
}
