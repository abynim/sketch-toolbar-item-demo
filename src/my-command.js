import sketch, { UI } from 'sketch'
import SketchToolbar from 'sketch-toolbar-item'

// Handlers for the toolbar item's run action
export function sayHello() {
  UI.alert('Hello from the toolbar!', 'Have a great day 👋')
}

export function sayNamaste() {
  UI.alert('Namaste from the toolbar!', 'Be cool 🙏')
}

export function sayGoodbye() {
  UI.alert('Goodbye from the toolbar!', 'See ya later, maybe ✌️')
}

// The handler for the toolbar item's validate action
// If this method is not implemented, your toolbar item is always enabled
// NOTE: Keep this method light. Doing too much here will slow down Sketch
export function validateToolbarItem(context) {

  // Get a reference to your toolbar item via context
  let toolbarItem = context.toolbarItem

  let doc = sketch.getSelectedDocument()
  let selectedLayers = doc.selectedLayers

  // As an example: enable the toolbar item if selection is not empty
  toolbarItem.enabled = !selectedLayers.isEmpty

  // To change the item's icon during validation,
  // pass a relative path to another 32x32px image in your plugin's Resources folder:
  // This is entirely optional!

  // toolbarItem.iconImagePath = selectedLayers.isEmpty ? "hello-toolbar-icon-flipped.png" : "hello-toolbar-icon.png";
}

export function registerToolbarActions(context) {

  // register a single toolbar item by passing:
  // 1. the current context
  // 2. the command identifier of the action this item will trigger
  // 3. the relative path to a 32x32px icon image in your plugin's Resources folder

  // To add a different image for dark mode, separate the image paths with a |
  SketchToolbar.registerToolbarAction(context, 'goodbye', 'goodbye-toolbar-icon.png|goodbye-toolbar-icon-dark.png')

  // ------------------------

  // to register a group of items, create specifiers for each item then register them as a group
  let item1 = SketchToolbar.specifierForToolbarAction(context, 'namaste', 'namaste-toolbar-icon.png|namaste-toolbar-icon-dark.png')
  let item2 = SketchToolbar.specifierForToolbarAction(context, 'hello', 'hello-toolbar-icon.png|hello-toolbar-icon-dark.png')

  SketchToolbar.registerToolbarGroup(context, 'salutations', [item1, item2])

  // ------------------------

  // to register a toolbar item with a dropdown menu, create a menuItem for each sub-item
  let menuItem1 = SketchToolbar.menuItemForToolbarAction(context, 'hello', 'hello-toolbar-icon.png|hello-toolbar-icon-dark.png')
  let menuItem2 = SketchToolbar.menuItemForToolbarAction(context, 'namaste', 'namaste-toolbar-icon.png|namaste-toolbar-icon-dark.png')
  let menuItem3 = SketchToolbar.separatorMenuItem();
  let menuItem4 = SketchToolbar.menuItemForToolbarAction(context, 'goodbye', 'goodbye-toolbar-icon.png|goodbye-toolbar-icon-dark.png')

  // Then register them using the `registerToolbarMenu` method
  SketchToolbar.registerToolbarMenu(context, 'greetings', 'Greetings', 'greetings-toolbar-icon.png|greetings-toolbar-icon-dark.png', [menuItem1, menuItem2, menuItem3, menuItem4])

}