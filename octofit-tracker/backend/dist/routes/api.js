import { Router } from 'express';
function createCrudRouter(model) {
    const router = Router();
    const list = async (_request, response, next) => {
        try {
            response.json(await model.find().sort({ createdAt: -1 }).lean());
        }
        catch (error) {
            next(error);
        }
    };
    const create = async (request, response, next) => {
        try {
            response.status(201).json(await model.create(request.body));
        }
        catch (error) {
            next(error);
        }
    };
    const update = async (request, response, next) => {
        try {
            const document = await model.findByIdAndUpdate(request.params.id, request.body, {
                new: true,
                runValidators: true,
            });
            if (!document) {
                response.status(404).json({ error: 'Resource not found' });
                return;
            }
            response.json(document);
        }
        catch (error) {
            next(error);
        }
    };
    const remove = async (request, response, next) => {
        try {
            const document = await model.findByIdAndDelete(request.params.id);
            if (!document) {
                response.status(404).json({ error: 'Resource not found' });
                return;
            }
            response.status(204).send();
        }
        catch (error) {
            next(error);
        }
    };
    router.get('/', list);
    router.post('/', create);
    router.patch('/:id', update);
    router.delete('/:id', remove);
    return router;
}
export default createCrudRouter;
