// Shares the main JEBG customer schema and Apps Script receipt flow.
(function(){
const form=document.getElementById('enquiry');if(!form)return;
let googleWebAppUrl="https://script.google.com/macros/s/AKfycbyfyt1mkqeaUgLu0b-nKTYIUXi4CvJn3GXwfyb7aU5WFbS-cbtf3ef1AYrQ6J_vcaVu/exec";
fetch('https://jebg.jamilaexim.com/backend-config.json',{cache:'no-store',credentials:'omit'}).then(r=>{if(!r.ok)throw new Error('Connection file unavailable');return r.json();}).then(config=>{
 if(config.schemaVersion===1&&typeof config.submissionUrl==='string'&&/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]{20,200}\/exec$/.test(config.submissionUrl))googleWebAppUrl=config.submissionUrl;
}).catch(()=>{/* Keep the same current working endpoint as the main JEBG website. */});
const pendingGoogleRequests=new WeakMap();
function saveSubmission(form,kind,statusId){
 if(!form.reportValidity())return;
 const values=Object.fromEntries(new FormData(form));

 const data={...values,kind,consent:form.elements.updates.checked,agreement:form.elements.agreement.checked};delete data.updates;
 const fingerprint=JSON.stringify(data),previous=pendingGoogleRequests.get(form);
 const requestId=previous&&previous.fingerprint===fingerprint?previous.id:crypto.randomUUID();
 pendingGoogleRequests.set(form,{fingerprint,id:requestId});data.requestId=requestId;
 const post=document.createElement('form');post.method='POST';post.action=googleWebAppUrl;post.target='_blank';post.enctype='application/x-www-form-urlencoded';post.style.display='none';post.rel='noopener';
 const input=document.createElement('input');input.type='hidden';input.name='payload';input.value=JSON.stringify(data);post.appendChild(input);document.body.appendChild(post);
 const status=document.getElementById(statusId);status.style.color='#b7cbd9';
 status.textContent='Opening your confirmation in a new tab. Your submission is saved only when that page displays a reference number. If no tab opens, allow this form to open a confirmation tab and try again.';
 post.submit();post.remove();
}
form.onsubmit=e=>{e.preventDefault();saveSubmission(form,'customer','status')};

document.querySelectorAll('[data-enquire]').forEach(button=>button.addEventListener('click',()=>{
 form.elements.product.value=button.dataset.enquire;
 document.getElementById('contact').scrollIntoView({behavior:'smooth'});
 form.elements.name.focus({preventScroll:true});
}));
})();
