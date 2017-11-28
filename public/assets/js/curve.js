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
