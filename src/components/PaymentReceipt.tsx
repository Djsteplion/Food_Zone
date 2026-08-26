import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
//import {toPng } from "html-to-image";
import { toJpeg } from "html-to-image";
//import html2canvas from "html2canvas";
import { useRef } from "react";
import Logo from '../images/logo.png';

export default function PaymentReceipt() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    paymentData,
    verifiedStatus,
    amount,
    total,
    customer_name,
    customer_email,
    //customer_phone
  } = state || {};

 // const loggeduser = JSON.parse(localStorage.getItem("user") || "{}");

  // =========================
  // DOWNLOAD PDF
  // =========================
  const receiptRef = useRef<HTMLDivElement>(null);

    const downloadReceipt = async () => {
      if (!receiptRef.current) return;

      try {
        // Capture as JPEG instead of PNG
        const dataUrl = await toJpeg(receiptRef.current, {
          quality: 0.92,      // 0-1 (0.9 is excellent)
          pixelRatio: 2,      // 2 is more than enough
          cacheBust: true,
          backgroundColor: "#ffffff",
        });

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compress: true,
        });

        const imgProps = pdf.getImageProperties(dataUrl);

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        // Scale down if taller than the page
        const finalHeight = Math.min(imgHeight, pageHeight);

        pdf.addImage(
          dataUrl,
          "JPEG",
          0,
          0,
          imgWidth,
          finalHeight,
          undefined,
          "FAST" // compression mode
        );

        pdf.save("creator-realm-receipt.pdf");
      } catch (error) {
        console.error("Failed to generate receipt:", error);
      }
    };
  /*
  const downloadReceipt = async () => {
   // alert("Download button clicked");
    if (!receiptRef.current) return;

    const canvas = await html2canvas(receiptRef.current, {
      scale: 3, // higher quality
      useCORS: true, // allows your logo image
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save("creator-realm-receipt.pdf");
  };
 */

  /*
  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Creator Realm Receipt", 20, 20);

    doc.setFontSize(12);

    doc.text(`Customer: ${paymentData.customer.name}`, 20, 40);
    doc.text(`Email: ${paymentData.customer.email}`, 20, 50);
    doc.text(`Phone: ${paymentData.customer.phone_number}`, 20, 60);

    doc.text(`Transaction Ref: ${paymentData.tx_ref}`, 20, 80);
    doc.text(`Flutterwave Ref: ${paymentData.flw_ref}`, 20, 90);
    doc.text(`Transaction ID: ${paymentData.transaction_id}`, 20, 100);

    doc.text(`Amount: $${amount.toFixed(2)}`, 20, 120);
    doc.text(`Transaction Fee: $${transactionFee.toFixed(2)}`, 20, 130);
    doc.text(`VAT: $${vat.toFixed(2)}`, 20, 140);
    doc.text(`Total Paid: $${total.toFixed(2)}`, 20, 150);

    doc.text(`Payment Method: Card`, 20, 170);
    doc.text(`Status: ${paymentData.status}`, 20, 180);

    doc.save("creator-realm-receipt.pdf");
  };
  */


  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-[#4F39F6] text-white px-6 py-3 rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 px-4 py-10 flex justify-center items-center">
      <div className="w-full max-w-2xl">
        {/* RECEIPT (this is what gets exported) */}
        <div
          ref={receiptRef}
          className="bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* TOP */}
          <div className="bg-[#b34500] text-white p-8 text-center">

            <img src={Logo} alt="Logo" className='w-16 h-5 lg:w-25.25 lg:h-9.75 mb-4 mx-auto' />

            <h2 className="text-3xl font-bold">
              Payment Successful
            </h2>

            <p className="text-sm opacity-80 mt-2">
              Your transaction was completed successfully
            </p>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-8 space-y-5">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Name</span>
              <span className="font-medium text-right">
                {customer_name}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-right break-all">
                {customer_email}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Transaction Ref</span>
              <span className="font-medium text-right break-all">
                {paymentData.tx_ref}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Flutterwave Ref</span>
              <span className="font-medium text-right break-all">
                {paymentData.flw_ref}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-medium">
                {paymentData.transaction_id}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium">Card</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">Amount</span>
              <span className="font-medium">
                ${amount.toFixed(2)}
              </span>
            </div>


            <div className="flex justify-between pt-2">
              <span className="text-lg font-semibold">
                Total Paid
              </span>

              <span className="text-2xl font-bold text-[#4F39F6]">
                ${total?.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-center pt-3">
              <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium capitalize">
                {verifiedStatus}
              </span>
            </div>
          </div>
        </div>

        {/* BUTTONS (not included in PDF) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <button
            onClick={downloadReceipt}
            className="w-full bg-[#4F39F6] hover:bg-[#3d2bd9] text-white py-4 rounded-2xl font-semibold transition"
          >
            Download PDF
          </button>

          <button
            onClick={() => {
                navigate("/appreciation");
            }}
            className="w-full border border-gray-300 hover:bg-gray-100 py-4 rounded-2xl font-semibold transition"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}