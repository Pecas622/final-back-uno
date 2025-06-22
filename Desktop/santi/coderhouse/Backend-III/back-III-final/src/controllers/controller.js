import { productsService, usersService } from "../services/service.js";

class Controller {
    constructor(service) {
        this.service = service;
    }
    createOne = async (req, res) => {
        const data = req.body;
        const response = await this.service.createOne(data);
        //res.status(201).json({ response, method, originalUrl });
        res.json201(response);
    };
    readAll = async (req, res) => {
        const filter = req.query;
        const response = await this.service.readAll(filter);
        if (response.length === 0) {
            res.json404();
        }
        res.json200(response);
    };
    readById = async (req, res) => {
        const { id } = req.params;
        const response = await this.service.readById(id);
        if (!response) {
            res.json404();
        }
        res.json200(response);
    };
    updateById = async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const response = await this.service.updateById(id, data);
        if (!response) {
            res.json404();
        }
        res.json200(response);
    };
    destroyById = async (req, res) => {
        const { id } = req.params;
        const response = await this.service.destroyById(id);
        if (!response) {
            res.json404();
        }
        res.json200(response);
    };
}

const productsController = new Controller(productsService);
const usersController = new Controller(usersService);
export { productsController, usersController };