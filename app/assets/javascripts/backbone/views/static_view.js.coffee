Aaronreisman.Views ||= {}

class Aaronreisman.Views.StaticView extends Backbone.View
  about: JST["backbone/templates/static/about"]
  contact: JST["backbone/templates/static/contact"]
  distractions: JST["backbone/templates/static/distractions"]

  render: (action) =>
    $(@el).html(@[action]())
    return this
