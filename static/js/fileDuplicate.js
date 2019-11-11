document.getElementById('buttonid').addEventListener('click', openDialog);
        document.getElementById('upload1').addEventListener('input', function (evt) {
            document.getElementById('file-uploaded').innerHTML = this.files[0].name; 
    
    
});
function openDialog() {
  document.getElementById('upload1').click();
//   console.log(document.getElementById('fileid').value);

  
  
}

document.getElementById('buttonid').addEventListener('', openDialog);

document
.getElementById("fileBtn")
.addEventListener("click", showFile);
document
.getElementById("textBtn")
.addEventListener("click", showtext);

function showFile() {
document.getElementById("file").style.display = "block";
document.getElementById("text").style.display = "none";
document.getElementById("fileBtn").classList.add("active1");
document.getElementById("textBtn").classList.remove("active1");


// document.getElementById("textBtn").classList.remove("active");
// document.getElementById('fileBtn').classList.add('tab-active');
document.getElementById('resultArea').style.display = "none";
}
function showtext() {
document.getElementById("text").style.display = "block";
document.getElementById("file").style.display = "none";
document.getElementById("textBtn").classList.add("active1");
document.getElementById('fileBtn').classList.remove('active1')

}


$('#uploadUrlBtn').on('click', function(e) {

    e.preventDefault()

    $('#uploadForm').attr("style", "display:none")
    $('#uploadURLForm').attr("style", "display:block")

    
})

$('#uploadFileToggle').on('click', function(e) {
    e.preventDefault();

    $('#uploadForm').attr("style", "display:block")
    $('#uploadURLForm').attr("style", "display:none")
    
})


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

    $('#uploadForm').submit(function(e) {
        var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
        e.preventDefault();

        var bar = $('.bar');
        var progress = $('.progess')
        var percent = $('.progress-bar');
        var status = $('#status');
        $(".progress").attr("style", "display: block" );
        // $("#text").attr("style", "display: block" );
        $('#resultArea').attr("style", "display:block");
    

          if(  ($('#upload1').val() == '') ){
            console.log('Select a file to upload')
            // console.log(response)
            toastr.error('Select a file to upload')

          }else{ 
        
            $form = $(this)
            var formData = new FormData(this);
            console.log(formData);
            formData.append('file', $('#upload1')[0].files[0]);
            $.ajax({
              xhr: function() {
                var xhr = new window.XMLHttpRequest();
            
                xhr.upload.addEventListener("progress", function(evt) {
                  if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    var percentVal = '0%';
                    percent.width(`${percentComplete}%`);
                    percent.text(`${percentComplete}%`);
                    console.log(percentComplete);
            
                    if (percentComplete === 100) {
                      percent.text('Upload Completed');
            
                    }
            
                  }
                }, false);
            
                return xhr;
              },
                url: "https://docufix.pythonanywhere.com/upload/delimeter/",
                type: "POST",
                data: formData,
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                },
                success: function(response){
                    console.log('success');
                    console.log(response.responseJSON);
                    $(".progress").attr("style", "display: none " );
                    progress.remove()
                    let delimiter = $('#delimiter').val();
                    duplicateChecker(response.file1, delimiter)
                    // $('#textareaDifferences').val(response.file1)
                    toastr.success("Content Loaded Successfully");
                    
                },
                error: function(response){
                    $(".progress").attr("style", "display: none " );
                    toastr.error("An Error Occured");
                    console.log(response.responseJSON);
                    
                },
                cache: false,
                contentType: false,
                processData: false
                
            })
        }
    })
        
       
    
    $('.textDuplicate').on('submit', function (e) {
      document.getElementById("shareBtn").style.display = "block";

        e.preventDefault();
      // $('#textareaResult').attr("style", "display:block");
        let separators = [];
        let firstString = $('#textareaBefore').val()
        let delimiter = $('#delimiter').val();
        duplicateChecker(firstString, delimiter)

    // let firstStringSet = new Set(firstString.split(new RegExp(separators.join('|'), 'g')))
    // let secondStringSet = new Set(secondString.split(new RegExp(separators.join('|'), 'g')))

    // console.log(secondStringSet);
    // let firstStringSet = new Set(firstString.split(delimiter))
    // console.log(firstStringSet)

    // let firstStringArray = [...firstStringSet]
    // $('#textareaAfter').val(firstStringArray);
    // $("#textareaDifferences").val(firstStringArray);
    // $("#textareaDifferences").html(firstStringArray);

    
    // let secondStringArray = secondString.split(new RegExp(separators.join('|'), 'g'))
    // // $('#result').html(' ')
    // $("#text").attr('style',  'display:block');
        
    // secondStringSet.forEach( word => {

    //     let resultA = firstStringArray.filter(newWord => newWord === word  );
    //     let resultB = secondStringArray.filter( newWord => newWord === word );
    //     if (resultB != 0 && resultA != 0 ){
    //     console.log( `${word} appeared in First document ${resultA.length} time and it appeared in Second document ${resultB.length} times`);
      
      
    //     $('#result').append(
            
    //         `${word} appeared in First document ${resultA.length} time and it appeared in Second document ${resultB.length} times <br>`)
    
    // }
    

  
    // });
  

    

})




$('#uploadURLForm').submit(function(e) {
  var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
  var bar = $('.bar');
  var progress = $('.progess')
  var percent = $('.progress-bar');
  var status = $('#status');
  $(".progress").attr("style", "display: block" );
  $('#resultArea').attr("style", "display:block");


    e.preventDefault();

    if(  ($('#url1').val() == '') ){
      console.log('One of the input file is missing')
      // console.log(response)
      toastr.error('One of the input file is missing')

    }else{ 
  
      $form = $(this)
      var formData = new FormData(this);
      console.log(formData);
      formData.append('url1', $('#url1').val());
  
      console.log($('#url1').val());
      
      console.log(formData);

      console.log($("#percentageS"));

  
      $.ajax({
        xhr: function() {
          var xhr = new window.XMLHttpRequest();
      
          xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              var percentVal = '0%';
              percent.width(`${percentComplete}%`);
              percent.text(`${percentComplete}%`);
              console.log(percentComplete);
      
              if (percentComplete === 100) {
                percent.text('Upload Completed');
      
              }
      
            }
          }, false);
      
          return xhr;
        },
          url: "https://docufix.pythonanywhere.com/upload/delimeter/url/",
          type: "POST",
          data: formData,
          beforeSend: function(xhr, settings) {
              if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                  xhr.setRequestHeader("X-CSRFToken", csrftoken);
              }
          },
          success: function(response){
              console.log('success');
              console.log(response);
              $(".progress").attr("style", "display: none " );
              progress.remove()
              $('#textareaDifferences').val(response.file1)
              toastr.success("Content Loaded Successfully");
              
          },
          error: function(response){
              // console.log(response)
              toastr.error(response.responseJSON);
              console.log(response.responseJSON);
              $(".progress").attr("style", "display: none " );
              
          },
          cache: false,
          contentType: false,
          processData: false
          
      })
  }
})
  
$('#resetbutton').click(function(e) {
  e.preventDefault();
  $('#textareaResult').html('');
  $('#textareaResult').val('');
  $('#textareaBefore').html('');
  $('#textareaBefore').val('');


  
})


function duplicateChecker(text, delimiter) {
  document.getElementById("shareBtn").style.display = "block";
  $('#resultArea').attr("style", "display:block");
  let separators = [];
  let firstString = text;

  // var names = ["Mike","Matt","Nancy","Adam","Jenny","Nancy","Carl"];

  // let firstStringSet = new Set(firstString.split(new RegExp(separators.join('|'), 'g')))
  // let secondStringSet = new Set(secondString.split(new RegExp(separators.join('|'), 'g')))

  // console.log(secondStringSet);
  let lowerCaseValue = firstString.toLowerCase().split(delimiter)
  let standardCaseValue = firstString.split(delimiter)
  

  const lowerCaseMap = lowerCaseValue.map(x => x.replace('\n', '').trim())


  let unique = {};
  lowerCaseMap.forEach(function(i,v) {
    if(!unique[i]) {
      unique[standardCaseValue[v]] = true;
    }
  });
  
 

  console.log(Object.keys(unique));
  

  
  $('#textareaAfter').val(Object.keys(unique));
  $('#textareaResult').val(Object.keys(unique));
  $("#textareaDifferences").val(Object.keys(unique));
  $("#textareaDifferences").html(Object.keys(unique));





};

