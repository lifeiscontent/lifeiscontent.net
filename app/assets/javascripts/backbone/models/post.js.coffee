class Aaronreisman.Models.Post extends Backbone.Model
  paramRoot: 'post'

  defaults:
    title: null
    content: null

class Aaronreisman.Collections.PostsCollection extends Backbone.Collection
  model: Aaronreisman.Models.Post
  url: '/posts'
