import swaggerJSDoc from "swagger-jsdoc";
import {SwaggerUiOptions} from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const swagggerUiOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://www.iconarchive.com/download/i109305/wikipedia/flags/SV-El-Salvador-Flag.1024.png');
            height: 120px;
            width: auto;
        }
        .swagger-ui .topbar a {
            flex: 0;
        }
        .swagger-ui .topbar {
            background-color: #002442;
        }
    `,
    customSiteTitle: 'Documentation REST API Express / TypeScript',
}

export default swaggerSpec;
export {
    swagggerUiOptions
}