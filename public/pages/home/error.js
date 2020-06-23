export default () => {};

export function ErrorDictionary(error) {
  this.error = error;
  this.storageErrorCode = {
    'storage/unknown': 'Ocorreu um erro desconhecido.',
    'storage/object-not-found': 'Nenhum objeto na referência desejada.',
    'storage/bucket-not-found': 'Nenhum intervalo configurado para o Cloud Storage.',
    'storage/project-not-found': 'Nenhum projeto configurado para o Cloud Storage.',
    'storage/quota-exceeded': 'A cota do intervalo do Cloud Storage foi excedida.',
    'storage/unauthenticated':
      'O usuário não está autenticado. Faça a autenticação e tente novamente.',
    'storage/unauthorized': 'O usuário não está autorizado a executar a ação desejada.',
    'storage/retry-limit-exceeded':
      'O limite máximo de tempo da operação foi excedido. Envie novamente.',
    'storage/canceled': 'O usuário cancelou a operação.',
    'storage/invalid-url':
      'URL inválido fornecido para refFromURL(). Deve estar no formato: gs://bucket/object ou https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=&ltTOKEN>.',
    'storage/no-default-bucket':
      'Nenhum bucket foi definido na propriedade storageBucket da configuração.',
    'storage/cannot-slice-blob':
      'Em geral, isso ocorre normalmente quando o arquivo local é alterado (excluído, salvo novamente etc.). Tente fazer o upload novamente após verificar que o arquivo não foi alterado.',
  };
  this.firestoreErrorCode = {
    'firestore/cancelled': 'cancelado: a operação foi cancelada ',
    'firestore/unknown': 'desconhecido: erro desconhecido ou erro de um domínio de erro diferente.',
    'firestore/invalid-argument':
      'argumento inválido: o cliente especificou um argumento inválido.',
    'firestore/deadline-exceeded':
      'prazo excedido: o prazo expirou antes que a operação pudesse ser concluída.',
    'firestore/not-found': 'não encontrado: algum documento solicitado não foi encontrado.',
    'firestore/internal':
      'internal: erros internos. Significa que alguns invariantes esperados pelo sistema subjacente foram quebrados. Se você vir um desses erros, algo está muito quebrado.',
    'firestore/unavailable':
      'indisponível: o serviço está indisponível no momento. É mais provável que seja uma condição transitória e pode ser corrigida tentando novamente com uma retirada.',
    'firestore/data-loss': 'perda de dados: perda ou corrupção irrecuperável de dados.',
    'firestore/unauthenticated':
      'não autenticado: a solicitação não possui credenciais de autenticação válidas para a operação.',
  };
  this.translate = function (baseStorage) {
    if (baseStorage) {
      return this.storageErrorCode[this.error.code];
    }
    return this.torageErrorCode[this.error.code];
  };
}
