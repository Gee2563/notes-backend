const noteRouter = require('express').Router()
const Note = require('../models/note')

noteRouter.get('/', (request, response) => {
    Note.find({}).then(result => {
      response.json(result)
    })
  })
  
noteRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response
        } else {
          response.status(404).end()
        }
      })
      .catch(error   => next(error))
  })

  noteRouter.post('/', (request, response, next) => {
    const body = request.body
  
    const note = new Note({
      content: body.content,
      important: body.important || false
    })  
  
    note.save()
      .then(savedNote => {
        response.json(savedNote)
      })
      .catch(error => next(error))
  })
  
noteRouter.put('/:id', (request, response, next) => {
    const { content, important } = request.body
    Note.findByIdAndUpdate(
      request.params.id,
      { content, important },
      { new: true, runValidators: true, context: 'query' })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })
  
noteRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  module.exports = noteRouter