angular.module("umbraco")
    .controller("My.MarkdownEditorController",
        // inject umbracos assetsService and editor service
        function ($scope, assetsService, $timeout, editorService) {
            if ($scope.model.value === null || $scope.model.value === "") {
                $scope.model.value = $scope.model.config.defaultValue;
            }

            // tell the assetsService to load the markdown.editor libs from the markdown editors
            // plugin folder
            assetsService
                .load([
                    "~/App_Plugins/MarkDownEditor/lib/markdown.converter.js",
                    "~/App_Plugins/MarkDownEditor/lib/markdown.sanitizer.js",
                    "~/App_Plugins/MarkDownEditor/lib/markdown.editor.js"
                ])
                .then(function () {
                    // this function will execute when all dependencies have loaded
                    $timeout(function () {
                        var converter2 = new Markdown.Converter();
                        var editor2 = new Markdown.Editor(converter2, "-" + $scope.model.alias);
                        editor2.run();

                        // subscribe to the image dialog clicks
                        editor2.hooks.set("insertImageDialog", function (callback) {
                            var mediaPicker = {
                                disableFolderSelect: true,
                                submit: function (model) {
                                    var selectedImagePath = model.selection[0].image;
                                    callback(selectedImagePath);
                                    editorService.close();
                                },
                                close: function () {
                                    editorService.close();
                                }
                            };
                            editorService.mediaPicker(mediaPicker);

                            return true; // tell the editor that we'll take care of getting the image url
                        });
                    });
                });

            // load the separate css for the editor to avoid it blocking our JavaScript loading
            assetsService.loadCss("~/App_Plugins/MarkDownEditor/lib/markdown.editor.less");
        });