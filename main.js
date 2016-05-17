/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */

/*jslint plusplus: true, vars: true, nomen: true */
/*global define, brackets, console, setTimeout */

define(function (require, exports, module) {
	"use strict";
	
	var AppInit             = brackets.getModule("utils/AppInit"),
		Menus = brackets.getModule("command/Menus"),
		DocumentManager     = brackets.getModule("document/DocumentManager"),
		FileSystem          = brackets.getModule("filesystem/FileSystem"),
		FileUtils           = brackets.getModule("file/FileUtils"),
		ExtensionUtils      = brackets.getModule("utils/ExtensionUtils"),
		PanelManager        = brackets.getModule("view/PanelManager"),
		KeyBindingManager   = brackets.getModule('command/KeyBindingManager'),
		CommandManager      = brackets.getModule("command/CommandManager"),
		Commands            = brackets.getModule("command/Commands");
	
	function getSelectionText() {
		var text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text;
		}
		return text;
	}
	
	function newEdit() {
		var name = 'quick-tests/'+new Date().toString().split(' ').slice(0,5).join('_')+'.'+DocumentManager.getCurrentDocument().language._fileExtensions[0];
		var txt = getSelectionText();
		
		if(txt != '') {
			FileUtils.writeText( FileSystem.getFileForPath(ExtensionUtils.getModulePath(module)+name), txt, true )
				.then(function () {
					$('.working-set-splitview-btn').click();
					$('#splitview-menu-cmd\\.splitViewHorizontal').parent().click();
					CommandManager.execute(Commands.CMD_ADD_TO_WORKINGSET_AND_OPEN, {fullPath: ExtensionUtils.getModulePath(module)+name, paneId: "second-pane"});
					$('#second-pane .pane-header-close-btn').click(function() {
						$('#second-pane .pane-header-close-btn').click();
					});
					CommandManager.execute('builder.build');
				});
		} else {
			FileUtils.writeText( FileSystem.getFileForPath(ExtensionUtils.getModulePath(module)+name), txt, true )
				.then(function () {
					$('.working-set-splitview-btn').click();
					$('#splitview-menu-cmd\\.splitViewHorizontal').parent().click();
					CommandManager.execute(Commands.CMD_ADD_TO_WORKINGSET_AND_OPEN, {fullPath: ExtensionUtils.getModulePath(module)+name, paneId: "second-pane"});
					$('#second-pane .pane-header-close-btn').click(function() {
						$('#second-pane .pane-header-close-btn').click();
					});
				});
		}
	}
	
	CommandManager.register('Test Snipet', 'quicktest.file', newEdit);
	KeyBindingManager.addBinding('quicktest.file', 'Ctrl-Alt-M');
	
	Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuDivider();
	Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU).addMenuItem('quicktest.file');
});
