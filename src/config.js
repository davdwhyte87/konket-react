const dev={
    API_URL:"http://localhost:300"
}

const prod={
    API_URL:"llll"
}
const config=process.env.NODE_ENV=='development'?dev:prod
export default  config