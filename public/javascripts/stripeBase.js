'use strict';

var stripe = Stripe('pk_test_Qy30tfLZhKSn4pEFoIo3zeIj');

function registerElements(elements, exampleName) {
  var formClass = '.' + exampleName;
  var example = document.querySelector(formClass);

  var form = example.querySelector('form');
  var resetButton = example.querySelector('a.reset');
  var error = form.querySelector('.error');
  var errorMessage = error.querySelector('.message');

  function enableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.removeAttribute('disabled');
      }
    );
  }

  function disableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.setAttribute('disabled', 'true');
      }
    );
  }

  // Listen for errors from each Element, and show error messages in the UI.
  elements.forEach(function(element) {
    element.on('change', function(event) {
      if (event.error) {
        error.classList.add('visible');
        errorMessage.innerText = event.error.message;
      } else {
        error.classList.remove('visible');
      }
    });
  });

  // Listen on the form's 'submit' handler...
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show a loading screen...
    example.classList.add('submitting');

    // Disable all inputs.
    disableInputs();

    // Gather additional customer data we may have collected in our form.
    var name = form.querySelector('#' + exampleName + '-name');
    var address1 = form.querySelector('#' + exampleName + '-address');
    var city = form.querySelector('#' + exampleName + '-city');
    var state = form.querySelector('#' + exampleName + '-state');
    var zip = form.querySelector('#' + exampleName + '-zip');
    var reportId = form.querySelector('#hiddenReportId').value;
    var email = form.querySelector('#example2-email').value;
    var phone = form.querySelector('#example2-cell').value;
    var buyReportOption = form.querySelector('#hiddenBuyReportOption').value;
    var searchTerm = $(".scheduleReport").attr('href');

    var additionalData = {
      name: name ? name.value : undefined,
      address_line1: address1 ? address1.value : undefined,
      address_city: city ? city.value : undefined,
      address_state: state ? state.value : undefined,
      address_zip: zip ? zip.value : undefined,
    };

    // Use Stripe.js to create a token. We only need to pass in one Element
    // from the Element group in order to create a token. We can also pass
    // in the additional customer data we collected in our form.
    stripe.createToken(elements[0], additionalData).then(function(result) {
      // Stop loading!
      example.classList.remove('submitting');

      if (result.token) {
          if(buyReportOption == "true")
          {
              var request = $.get( "/stripe/charge", { token_id: result.token.id, report_id: reportId, email: email, phone:phone});

              request.success(function( data ) {
                  $("#successMessage").text(data);
                  example.classList.add('submitted');
              });

              request.error(function() {
                  alert("Payment failure");
              });
          }
          else
          {
              var request = $.get( "/stripe/scheduleCharge", { token_id: result.token.id, searchPhrase: searchTerm, email: email, phone:phone});

              request.success(function( data ) {
                  $("#successMessage").text(data);
                  example.classList.add('submitted');
              });

              request.error(function() {
                  alert("Payment failure");
              });
          }
      } else {
        // Otherwise, un-disable inputs.
        enableInputs();
      }
    });
  });

  resetButton.addEventListener('click', function(e) {
    e.preventDefault();
    // Resetting the form (instead of setting the value to `''` for each input)
    // helps us clear webkit autofill styles.
    form.reset();

    // Clear each Element.
    elements.forEach(function(element) {
      element.clear();
    });

    // Reset error state as well.
    error.classList.remove('visible');

    // Resetting the form does not un-disable inputs, so we need to do it separately:
    enableInputs();
    example.classList.remove('submitted');
    $("#paymentForm").hide();
    $('html,body').animate({ scrollTop: $("#section1").offset().top - 100}, 'slow');

  });
}
