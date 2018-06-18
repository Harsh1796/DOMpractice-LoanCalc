// Submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //hide results
  document.getElementById('results').style.display = 'none';

  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults,2000);
 
  e.preventDefault();
});

//Calculate Results

function calculateResults() {

  //Variables of the User Interface
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPay = document.getElementById('monthly-payment');
  const totalPay = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Other Variables

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) /100 /12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute monthly payments

  const x = Math.pow(1 + calculatedInterest,calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPay.value = monthly.toFixed(2);
    totalPay.value =(monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';

    document.getElementById('loading').style.display = 'none';

    setTimeout(clearInput, 4000);

  } else { 
    showError('Please check inputs')
  }

}

function showError(error){

  document.getElementById('results').style.display = 'none';
    
  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 2000);
  setTimeout(clearInput, 2000);
}

function clearError(){
  document.querySelector('.alert').remove();
}
  
function clearInput(){
  amount.value = '';
  interest.value = '';
  years.value ='';
  document.getElementById('results').style.display = 'none';
}