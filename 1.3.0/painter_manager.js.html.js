tui.util.defineNamespace("fedoc.content", {});
fedoc.content["painter_manager.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Painter Manager\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar RowPainter = require('./row');\nvar CellPainter = require('./cell');\nvar DummyCellPainter = require('./dummyCell');\nvar TextPainter = require('./input/text');\nvar SelectPainter = require('./input/select');\nvar ButtonPainter = require('./input/button');\nvar MainButtonPainter = require('./input/mainButton');\n\n/**\n * Painter manager\n * @module painter/manager\n */\nvar PainterManager = tui.util.defineClass(/**@lends module:painter/manager.prototype */{\n    /**\n     * @constructs\n     * @param {Object} options - Options\n     */\n    init: function(options) {\n        this.gridId = options.gridId;\n        this.selectType = options.selectType;\n\n        this.inputPainters = this._createInputPainters(options.controller);\n        this.cellPainters = this._createCellPainters(options.controller);\n        this.rowPainter = this._createRowPainter();\n    },\n\n    /**\n     * Creates instances of input painters and returns the object that stores them\n     * using 'inputType' as keys.\n     * @param {module:painter/controller} controller - painter controller\n     * @returns {Object}\n     * @private\n     */\n    _createInputPainters: function(controller) {\n        return {\n            text: new TextPainter({\n                controller: controller,\n                inputType: 'text'\n            }),\n            password: new TextPainter({\n                controller: controller,\n                inputType: 'password'\n            }),\n            checkbox: new ButtonPainter({\n                controller: controller,\n                inputType: 'checkbox'\n            }),\n            radio: new ButtonPainter({\n                controller: controller,\n                inputType: 'radio'\n            }),\n            select: new SelectPainter({\n                controller: controller\n            }),\n            mainButton: new MainButtonPainter({\n                controller: controller,\n                inputType: this.selectType,\n                gridId: this.gridId\n            })\n        };\n    },\n\n    /**\n     * Creates instances of cell painters and returns the object that stores them\n     * using 'editType' as keys.\n     * @param {module:painter/controller} controller - painter controller\n     * @returns {Object} Key-value object\n     * @private\n     */\n    _createCellPainters: function(controller) {\n        var cellPainters = {\n            dummy: new DummyCellPainter({\n                controller: controller\n            }),\n            normal: new CellPainter({\n                controller: controller,\n                editType: 'normal'\n            })\n        };\n\n        _.each(this.inputPainters, function(inputPainter, editType) {\n            cellPainters[editType] = new CellPainter({\n                editType: editType,\n                controller: controller,\n                inputPainter: inputPainter\n            });\n        }, this);\n\n        return cellPainters;\n    },\n\n    /**\n     * Creates row painter and returns it.\n     * @returns {module:painter/row} New row painter instance\n     * @private\n     */\n    _createRowPainter: function() {\n        return new RowPainter({\n            painterManager: this\n        });\n    },\n\n    /**\n     * Returns an instance of cell painter which has given editType\n     * @param {String} editType - Edit type\n     * @returns {Object} - Cell painter instance\n     */\n    getCellPainter: function(editType) {\n        return this.cellPainters[editType];\n    },\n\n    /**\n     * Returns all cell painters\n     * @returns {Object} Object that has edit-type as a key and cell painter as a value\n     */\n    getCellPainters: function() {\n        return this.cellPainters;\n    },\n\n    /**\n     * Returns all input painters\n     * @param {Boolean} withoutMeta - if set to true, returns without meta cell painters\n     * @returns {Object} Object that has edit-type as a key and input painter as a value\n     */\n    getInputPainters: function(withoutMeta) {\n        var result = this.inputPainters;\n        if (withoutMeta) {\n            result = _.omit(result, 'mainButton');\n        }\n\n        return result;\n    },\n\n    /**\n     * Returns a row painter\n     * @returns {module:painter/row} Row painter\n     */\n    getRowPainter: function() {\n        return this.rowPainter;\n    }\n});\n\nmodule.exports = PainterManager;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"