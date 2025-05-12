import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "API Blog de Aprendizaje",
            version:"1.0.0",
            description: "API para Blog de Aprendizaje",
            contact:{
                name: "Randy Oscal",
                email: "roscal-2023279@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/blogAprendizaje/v1"
            }
        ]
    },
    apis:[
        "./src/comments*.js",
        "./src/publications/*.js",


    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }