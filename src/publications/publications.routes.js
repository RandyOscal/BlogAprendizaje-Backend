import express from 'express';
import { createPublication, getAllPublications, getPublicationById, getPublicationsByCategory, updatePublication, deletePublication } from "../publications/publications.controller.js";
import { uploadFiles } from "../middlewares/multer-uploads.js";

const router = express.Router();

/**
 * @swagger
 * /addPublication:
 *   post:
 *     summary: Crea una nueva publicación.
 *     tags:
 *       - Publicaciones
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la publicación.
 *                 example: Mi primera publicación
 *               category:
 *                 type: string
 *                 description: Nombre de la categoría asociada.
 *                 example: Tecnología
 *               description:
 *                 type: string
 *                 description: Descripción de la publicación.
 *                 example: Esta es una publicación sobre tecnología.
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Archivos asociados a la publicación.
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente.
 *       500:
 *         description: Error al crear la publicación.
 */
router.post('/addPublication', uploadFiles.array('files'), createPublication);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todas las publicaciones.
 *     tags:
 *       - Publicaciones
 *     responses:
 *       200:
 *         description: Publicaciones obtenidas exitosamente.
 *       500:
 *         description: Error al obtener las publicaciones.
 */
router.get('/', getAllPublications);

/**
 * @swagger
 * /list/{id}:
 *   get:
 *     summary: Obtiene una publicación por su ID.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación.
 *     responses:
 *       200:
 *         description: Publicación obtenida exitosamente.
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error al obtener la publicación.
 */
router.get('/list/:id', getPublicationById);

/**
 * @swagger
 * /category/{categoryName}:
 *   get:
 *     summary: Obtiene publicaciones por categoría.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la categoría.
 *     responses:
 *       200:
 *         description: Publicaciones obtenidas exitosamente.
 *       404:
 *         description: No se encontraron publicaciones para esta categoría.
 *       500:
 *         description: Error al obtener las publicaciones.
 */
router.get('/category/:categoryName', getPublicationsByCategory);

/**
 * @swagger
 * /updatePublication/{title}:
 *   put:
 *     summary: Actualiza una publicación existente.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Título de la publicación a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               newTitle:
 *                 type: string
 *                 description: Nuevo título de la publicación.
 *                 example: Mi publicación actualizada
 *               newCategory:
 *                 type: string
 *                 description: Nueva categoría asociada.
 *                 example: Ciencia
 *               newDescription:
 *                 type: string
 *                 description: Nueva descripción de la publicación.
 *                 example: Esta es una descripción actualizada.
 *               newFiles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Nuevos archivos asociados a la publicación.
 *     responses:
 *       200:
 *         description: Publicación actualizada exitosamente.
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error al actualizar la publicación.
 */
router.put('/updatePublication/:title', uploadFiles.array('newFiles'), updatePublication);

/**
 * @swagger
 * /deletePublication/{title}:
 *   delete:
 *     summary: Elimina una publicación por su título.
 *     tags:
 *       - Publicaciones
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Título de la publicación a eliminar.
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente.
 *       404:
 *         description: Publicación no encontrada.
 *       500:
 *         description: Error al eliminar la publicación.
 */
router.delete('/deletePublication/:title', deletePublication);

export default router;
