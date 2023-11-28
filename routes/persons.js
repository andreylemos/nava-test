var express = require('express');
var router = express.Router();
const { personsController } = require('./../controllers/persons');

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - name
 *         - document
 *         - bithdate
 *       properties:
 *         _id:
 *           type: uuuid
 *           description: The auto-generated id of the person
 *         name:
 *           type: string
 *           description: The name of the person
 *         document:
 *           type: string
 *           description: The document number of the person
 *         birthdate:
 *           type: string
 *           format: date
 *           description: Birth date of the person
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the person registry was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the person registry was updated
 *         deletedAt:
 *           type: string
 *           format: date
 *           description: The date the person registry was deleted
 *       example:
 *         _id: 656617ad984cf5d9fc4c879f
 *         name: Andrey Lemos
 *         document: '12345678900'
 *         birthdate: 1995-20-09T00:01:06.000Z
 *         createdAt: 2020-01-10T00:01:06.000Z
 *         updatedAt: 2021-02-11T00:02:06.000Z
 *         deletedAt: 2022-03-12T00:03:06.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Person
 *   description: The people search API
 * /persons:
 *   get:
 *     summary: Get all persons
 *     tags: [Person]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: The search was a success.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 *       404:
 *         description: Nobody was found.
 *       500:
 *         description: Some server error
 * /persons/{document}:
 *   get:
 *     summary: Get the person by document
 *     tags: [Person]
 *     parameters:
 *       - in: path
 *         name: document
 *         schema:
 *           type: string
 *         required: true
 *         description: The person document
 *     responses:
 *       200:
 *         description: The person response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: The person was not found
 *       500:
 *         description: Some server error
 */
router.get('/', personsController.getAll);
router.get('/:id', personsController.getPerson);

module.exports = router;