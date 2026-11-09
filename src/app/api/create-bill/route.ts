import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { planId, name, email, phone } = await req.json();

    const secretKey = process.env.TOYYIBPAY_SECRET_KEY || 'k8bb9jnh-ky3j-9spz-nrv3-jneu3t11qqvg';
    const categoryCode = process.env.TOYYIBPAY_CATEGORY_CODE || '2mvmzkh3';

    // Harga dalam sen (RM 1.90 = 190 sen, RM 9.90 = 990 sen)
    let billAmount = 990;
    let billName = 'PenaDigital AI Pro (Bulanan)';
    let billDesc = 'Langganan PenaDigital AI Pro tanpa had surat rasmi standard';

    if (planId === 'pay_per_surat') {
      billAmount = 190;
      billName = 'PenaDigital AI 1 Surat (Word & PDF)';
      billDesc = 'Akses 1 surat rasmi format Word & PDF tanpa watermark';
    } else if (planId === 'kumpulan') {
      billAmount = 2900;
      billName = 'PenaDigital AI Pakej Komuniti / AJK';
      billDesc = 'Akses 3-5 pengguna untuk organisasi dan peniaga';
    }

    const host = req.headers.get('host') || 'penadigital.vercel.app';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const returnUrl = `${protocol}://${host}/?payment=success&plan=${planId}`;
    const callbackUrl = `${protocol}://${host}/api/payment-callback`;

    const formData = new URLSearchParams();
    formData.append('userSecretKey', secretKey);
    formData.append('categoryCode', categoryCode);
    formData.append('billName', billName);
    formData.append('billDescription', billDesc);
    formData.append('billPriceSetting', '1');
    formData.append('billPayorInfo', '1');
    formData.append('billAmount', billAmount.toString());
    formData.append('billReturnUrl', returnUrl);
    formData.append('billCallbackUrl', callbackUrl);
    formData.append('billExternalReferenceNo', `PENA-${Date.now()}`);
    formData.append('billTo', name || 'Pengguna PenaDigital');
    formData.append('billEmail', email || 'pelanggan@penadigital.my');
    formData.append('billPhone', phone || '0123456789');
    formData.append('billPaymentChannel', '0'); // 0 = FPX & Card

    const toyyibResponse = await fetch('https://toyyibpay.com/index.php/api/createBill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await toyyibResponse.json();

    if (Array.isArray(data) && data[0]?.BillCode) {
      const billCode = data[0].BillCode;
      return NextResponse.json({
        success: true,
        billCode,
        paymentUrl: `https://toyyibpay.com/${billCode}`,
      });
    }

    console.error('ToyyibPay Error Response:', data);
    return NextResponse.json(
      { error: 'Gagal menjana pautan bayaran ToyyibPay. Sila semak semula kunci rahsia atau kategori.' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Create bill server error:', error);
    return NextResponse.json(
      { error: error?.message || 'Ralat sistem perbankan.' },
      { status: 500 }
    );
  }
}
