Aaronreisman.Views.Posts ||= {}

class Aaronreisman.Views.Posts.PostView extends Backbone.View
  template: JST["backbone/templates/posts/post"]

  tagName: "ul"
  className: "posts"

  render: ->
    $(@el).html(@template(@model.toJSON() ))
    return this
