export function errorDictionary (error) {
    this.error = error
    this.storageErrorCode = {
        "storage/unknown": "Ocorreu um erro desconhecido.",
        "storage/object-not-found": "Nenhum objeto na referência desejada.",
        "storage/bucket-not-found": "Nenhum intervalo configurado para o Cloud Storage.",
        "storage/project-not-found": "Nenhum projeto configurado para o Cloud Storage.",
        "storage/quota-exceeded": "A cota do intervalo do Cloud Storage foi excedida. Se você estiver no nível gratuito, faça upgrade para um plano pago. Se você estiver em um plano pago, entre em contato com o suporte do Firebase.",
        "storage/unauthenticated": "O usuário não está autenticado. Faça a autenticação e tente novamente.",
        "storage/unauthorized": "O usuário não está autorizado a executar a ação desejada. Verifique suas regras de segurança para garantir que estejam corretas.",
        "storage/retry-limit-exceeded": "O limite máximo de tempo em uma operação (upload, download, exclusão etc.) foi excedido. Envie novamente.",
        "storage/invalid-checksum": "O arquivo no cliente não corresponde à soma de verificação do arquivo recebido pelo servidor. Envie novamente.",
        "storage/canceled": "O usuário cancelou a operação.",
        "storage/invalid-event-name": "Nome inválido do evento fornecido. Precisa ser um dos valores [`running`, `progress`, `pause`]",
        "storage/invalid-url": "URL inválido fornecido para refFromURL(). Deve estar no formato: gs://bucket/object ou https://firebasestorage.googleapis.com/v0/b/bucket/o/object?token=&ltTOKEN>.",
        "storage/invalid-argument": `O argumento transmitido a put() precisa ser matriz "File", "Blob" ou "UInt8". O argumento transmitido a putString() precisa ser uma string bruta "Base64" ou "Base64URL".`,
        "storage/no-default-bucket": "Nenhum bucket foi definido na propriedade storageBucket da configuração.",
        "storage/cannot-slice-blob": "Em geral, isso ocorre normalmente quando o arquivo local é alterado (excluído, salvo novamente etc.). Tente fazer o upload novamente após verificar que o arquivo não foi alterado.",
        "storage/server-file-wrong-size": "O arquivo no cliente não corresponde ao tamanho do arquivo recebido pelo servidor. Envie novamente.",
    };
    this.firestoreErrorCode = {
        "firestore/cancelled": "cancelado: a operação foi cancelada ",
        "firestore/unknown": "desconhecido: erro desconhecido ou erro de um domínio de erro diferente.",
        "firestore/invalid-argument": "argumento inválido: o cliente especificou um argumento inválido. Observe que isso difere de 'pré-condição com falha'. 'argumento inválido' indica argumentos problemáticos, independentemente do estado do sistema (por exemplo, um nome de campo inválido).",
        "firestore/deadline-exceeded": "prazo excedido: o prazo expirou antes que a operação pudesse ser concluída. Para operações que alteram o estado do sistema, esse erro pode ser retornado mesmo se a operação for concluída com êxito. Por exemplo, uma resposta bem-sucedida de um servidor poderia ter sido adiada por tempo suficiente para o prazo expirar.",
        "firestore/not-found": "não encontrado: algum documento solicitado não foi encontrado.",
        "firestore/already-exists": "já existe: já existe algum documento que tentamos criar.",
        "firestore/permission-denied": "permissão negada: o chamador não tem permissão para executar a operação especificada.",
        "firestore/resource-exhausted": "esgotado por recursos: alguns recursos foram esgotados, talvez uma cota por usuário ou talvez todo o sistema de arquivos esteja sem espaço.",
        "firestore/failed-precondition": "pré-condição com falha: a operação foi rejeitada porque o sistema não está no estado necessário para a execução da operação.",
        "firestore/aborted": "abortado: a operação foi abortada, normalmente devido a um problema de simultaneidade, como abortamentos de transações etc.",
        "firestore/out-of-range": "fora do intervalo: tentativa de operação além do intervalo válido.",
        "firestore/unimplemented": "não implementado: a operação não está implementada ou não é suportada / ativada.",
        "firestore/internal": "internal: erros internos. Significa que alguns invariantes esperados pelo sistema subjacente foram quebrados. Se você vir um desses erros, algo está muito quebrado.",
        "firestore/unavailable": "indisponível: o serviço está indisponível no momento. É mais provável que seja uma condição transitória e pode ser corrigida tentando novamente com uma retirada.",
        "firestore/data-loss": "perda de dados: perda ou corrupção irrecuperável de dados.",
        "firestore/unauthenticated": "não autenticado: a solicitação não possui credenciais de autenticação válidas para a operação."
    };
    this.translate = function (baseStorage) {
       
        if (baseStorage) {
            return this.storageErrorCode[this.error.code]
        }

        else {
            return this.torageErrorCode[this.error.code]
        }
    };
}

