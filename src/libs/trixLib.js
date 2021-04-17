import trix from 'trix';
import { s3Upload } from "../libs/awsLib";

export async function createVideoButton(editor) {

    var videoButton = document.createElement("button");
    videoButton.setAttribute("type", "button");
    videoButton.setAttribute("class", "trix-button trix-button--icon trix-button--icon-video");
    videoButton.setAttribute("data-trix-attribute", "video");
    videoButton.setAttribute("title", "Embed Video");
    videoButton.setAttribute("tabindex", "-1");
    videoButton.innerText = "Video";
  
    document.querySelector(".trix-button-group.trix-button-group--block-tools").appendChild(videoButton);
  
    var videoDialog =
    `<div class="trix-dialog trix-dialog--video" data-trix-dialog="video" data-trix-dialog-attribute="video">
      <div class="trix-dialog__link-fields">
        <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="Enter a Youtube URL…" aria-label="URL" required="" data-trix-input="" disabled="disabled">
        <div class="trix-button-group">
          <input type="button" class="trix-button trix-button--dialog" value="Insert" data-trix-dialog-submit--video>
        </div>
      </div>
    </div>`;
    document.querySelector("[data-trix-dialogs]").insertAdjacentHTML("beforeend", videoDialog);
  
    document.querySelector("[data-trix-dialog-submit--video]").addEventListener('click', function() {
      var videoElement = document.querySelector("[data-trix-dialog=video] input[name=href]");
      
      if (videoElement.value) {
        
        var youtube_id = '';
        var url = videoElement.value.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
          youtube_id = url[2].split(/[^0-9a-z_\-]/i);
          youtube_id = youtube_id[0];
        }
        else {
          youtube_id = url;
        }
  
  
        var videoThumb = '<img src="https://img.youtube.com/vi/'+youtube_id+'/0.jpg">'
        var attachmentThumb = new trix.Attachment({
          contentType: 'application/youtube-thumb.html',
          content: videoThumb
        })
        editor.insertAttachment(attachmentThumb);
  
        var videoEmbed = '<iframe width="420" height="315" src="https://www.youtube.com/embed/'+youtube_id+'" frameborder="0" allowfullscreen></iframe>'
        var attachmentVideo = new trix.Attachment({
          contentType: 'application/youtube-video.html',
          content: videoEmbed
        })
        editor.insertAttachment(attachmentVideo);
  
        editor.selectionManager.unlock();
  
        videoElement.value = "";
      }
    })
  }

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

  export async function createDividerButton(editor) {
    var divider = document.createElement("button");
    divider.setAttribute("type", "button");
    divider.setAttribute("class", "trix-button trix-button--icon trix-button--icon-horizontal-rule");
    divider.setAttribute("data-trix-action", "x-horizontal-rule");
    divider.setAttribute("title", "Divider");
    divider.setAttribute("tabindex", "-1");
    divider.innerText = "Divider";
  
    document.querySelector("[data-trix-button-group=block-tools] [data-trix-attribute=quote]").after(divider);
  }

  export async function handleUpload(event) {
    var attachment = event.attachment;
    attachment.attachmentManager.delegate.composition.updateAttributesForAttachment({'caption': '<Caption>'}, attachment);
    await s3Upload(attachment);
  }

  export async function didMount() {
    window.addEventListener('trix-attachment-add', handleUpload);
    window.addEventListener('trix-action-invoke', handleTrixActions);
  
    trix.config.blockAttributes.heading2 = {
      tagName: "h2",
      terminal: true,
      breakOnReturn: true,
      group: false
    }
  
    window.addEventListener('scroll', function(e) {
      var toolbar  = document.getElementsByTagName("trix-toolbar")[0];
      var stop = toolbar ? toolbar.getBoundingClientRect().top : 0;
      if (toolbar) {
        if (stop <= 0) {
          toolbar.classList.add("sticky");
        } else {
          toolbar.classList.remove("sticky"); 
        }
      }
    });
  }
  
  export async function willUnmount() {
    window.removeEventListener('trix-attachment-add', handleUpload);
    window.removeEventListener('trix-action-invoke', handleTrixActions);
  }