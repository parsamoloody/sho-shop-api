// utils/crudFactory.ts
import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";
type AllowedPopulate = "category" | "subcategory" | "User" | "Option";

type CRUDHandlers<T> = {
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getOne: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    remove: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};

export function createCrudController<T>(
    model: Model<T>,
    resourceName: string,
    populateFields: AllowedPopulate[] = []
): CRUDHandlers<T> {
    return {
        // Get all documents
        async getAll(req, res, next) {
            try {
                let query = model.find();
                for (const field of populateFields) {
                    query = query.populate({ path: field, strictPopulate: false });
                }
                const data = await query.exec();
                res.json({ success: true, data });
            } catch (error) {
                next(error);
            }
        },

        // Get one document by ID
        async getOne(req, res, next) {
            try {
                let query = model.findById(req.params.id);
                for (const field of populateFields) {
                    query = query.populate(field);
                }
                const data = await query.exec();
                if (!data) {
                    res.status(404).json({ success: false, message: `${resourceName} not found` });
                }
                res.json({ success: true, data });
            } catch (error) {
                next(error);
            }
        },

        // Create new document
        async create(req, res, next) {
            try {
                console.log("before create", req.body);
                const data = await model.create(req.body);
                console.log("after create", data);
                res.status(201).json({ success: true, data });
            } catch (error) {
                next(error);
            }
        },

        // Update document
        async update(req, res, next) {
            try {
                const isExist = await model.findById(req.params.id);
                if (!isExist) {
                     await model.create(req.body)
                        .then((data) => {
                            res.status(201).json({ success: true, data });
                        })
                        .catch((error) => {
                            next(error);
                        });
                        return;
                }

                const data = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });

                if (!data) {
                    res.status(404).json({ success: false, message: `${resourceName} not found` });
                }
                res.json({ success: true, data });
            } catch (error) {
                next(error);
            }
        },

        // Delete document
        async remove(req, res, next) {
            try {
                const data = await model.findByIdAndDelete(req.params.id);
                if (!data) {
                    res.status(404).json({ success: false, message: `${resourceName} not found` });
                }
                res.json({ success: true, message: `${resourceName} deleted` });
            } catch (error) {
                next(error);
            }
        },
    };
}
