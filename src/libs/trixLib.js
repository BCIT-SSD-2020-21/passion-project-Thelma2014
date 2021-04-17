import trix from 'trix';
import { s3Upload } from "../libs/awsLib";

export async function createUploadButton(editor) {
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "trix-button trix-button--icon trix-button--icon-attach");
    button.setAttribute("data-trix-action", "x-attach");
    button.setAttribute("title", "Attach a file");
    button.setAttribute("tabindex", "-1");
    button.innerText = "Attach a file";
  
    var uploadButton = document.querySelector(".trix-button-group.trix-button-group--block-tools").appendChild(button);
    uploadButton.addEventListener('click', function() {
      // Create a temporary file input
      var fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute("accept", "image/*");
      fileInput.setAttribute("multiple", "");
      // Add listener on change for this file input
      fileInput.addEventListener("change", function(event) {
              var file, _i, _len, _ref, _results;
              _ref = this.files;
              _results = [];
              // Getting files
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  file = _ref[_i];
                  // pushing them to Trix
                  _results.push(editor.insertFile(file));
              }
              return _results;
          });
          // Then virtually click on it
          fileInput.click();
    });
  }