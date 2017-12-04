// login form
$('#login-form').submit(function(event) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "/signin",
    data: {
      email: $(this).find('input[name="email"]').val(),
      password: $(this).find('input[name="password"]').val()
    },
    success: function(response) {
      if(response.success) {
        Cookies.set('curveToken', response.token);
        window.location.replace(window.location.origin);
      } else {
        $('#notification').html('<div class="alert alert-info" role="alert"><h4 class="pull-left">Error Logging In</h4><br><p>' + response.message + '</p></div>');
      }
    },
  });
});

// send email

var resetForm = $('.reset-container');
var emailInput = resetForm.find('input[name="email"]');
var emailBtn = resetForm.find('button[type="submit"]');
var notificationWindow = $('.notification-container');
  $('#reset-form').submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: "/send_email",
      data: {
        email: emailInput.val()
      },
      success: function(response) {
        if(response.success) {
          resetForm.addClass('hidden')
          notificationWindow.removeClass('hidden')
        } else {
          $('#notification').html('<div class="alert alert-info" role="alert"><h4 class="pull-left">An error occure while sending email</h4><br><p>' + response.message + '</p></div>');
        }
      },
    });
  });

  // reset

  var $resetForm = $('#reset-password');
  var $emailInput = $resetForm.find('input[name="email"]');
  var $passwordInput = $resetForm.find('input[name="password"]');
  var $confirmInput = $resetForm.find('input[name="confirm"]');
  var $savePassword = $('#save-password');
  var token = window.location.search;
  $resetForm.submit(function(event) {
    event.preventDefault();
      $.ajax({
        type: "POST",
        url: "/reset",
        data: {
          email: $emailInput.val(),
          password: $passwordInput.val(),
          confirm: $confirmInput.val(),
          token: token
        },
        success: function(response) {
          if(response.success) {
            Cookies.set('curveToken', response.token);
            window.location.replace(window.location.origin);
          } else {
            $('#notification').html('<div class="alert alert-info" role="alert"><h4 class="pull-left">Reset Password Error</h4><br><p>' + response.message + '</p></div>');
          }
        }
      });
  });
