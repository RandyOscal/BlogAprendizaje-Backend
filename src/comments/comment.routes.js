import express from 'express';
import { createComment } from './comment.controller.js';

const router = express.Router();

/**
 * @swagger
 * /addComment:
 *   post:
 *     summary: Crea un nuevo comentario.
 *     tags:
 *       - Comentarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre del usuario que realiza el comentario.
 *                 example: JuanPerez
 *               publication:
 *                 type: string
 *                 description: ID de la publicación asociada al comentario.
 *                 example: 645c1b2f4f1a2c3d5e6f7g8h
 *               description:
 *                 type: string
 *                 description: Contenido del comentario.
 *                 example: Este es un comentario de prueba.
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comentario creado exitosamente.
 *                 comment:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       example: JuanPerez
 *                     publication:
 *                       type: string
 *                       example: 645c1b2f4f1a2c3d5e6f7g8h
 *                     description:
 *                       type: string
 *                       example: Este es un comentario de prueba.
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-05-11T12:34:56.789Z
 *       500:
 *         description: Error al crear el comentario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear el comentario.
 *                 error:
 *                   type: string
 *                   example: Detalles del error.
 */

router.post('/addComment', createComment);

export default router;