function bad(res, status, message){res.status(status).json({ok:false,error:message})}

export default async function handler(req,res){
  if(req.method!=='GET') return bad(res,405,'Method not allowed');
  const key=process.env.STRIPE_SECRET_KEY;
  if(!key) return bad(res,503,'Payment verification is not configured yet.');
  const sid=String(req.query?.session_id||'').trim();
  if(!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sid)) return bad(res,400,'Missing or invalid checkout session.');
  try{
    const r=await fetch('https://api.stripe.com/v1/checkout/sessions/'+encodeURIComponent(sid),{
      headers:{Authorization:'Bearer '+key}
    });
    if(!r.ok) return bad(res,403,'We could not confirm this purchase.');
    const s=await r.json();
    const expectedLink=process.env.STRIPE_PAYMENT_LINK_ID;
    const paid=s.status==='complete' && s.payment_status==='paid' && s.mode==='payment' && s.currency==='usd' && Number(s.amount_total)===2900;
    const rightLink=!expectedLink || s.payment_link===expectedLink;
    if(!paid || !rightLink) return bad(res,403,'This purchase is not eligible for tribute access.');
    res.setHeader('Cache-Control','no-store');
    res.status(200).json({ok:true,email:s.customer_details?.email||null,name:s.customer_details?.name||null});
  }catch(e){
    return bad(res,500,'Payment verification failed.');
  }
}
