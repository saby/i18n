interface IRequest {
   query: IQuery
   headers: IHeaders
}

interface IQuery {
   lang: string
}

interface IHeaders {
   "accept-language" : string
}
