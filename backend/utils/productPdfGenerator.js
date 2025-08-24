// // utils/productPdfGenerator.js
// import PDFDocument from 'pdfkit';
// import axios from 'axios';
// import moment from 'moment';
// import Category from '../models/Category.js';
// import Product from '../models/Product.js';

// export const generateProductsPdf = async (res) => {
//   // Invoice meta
//   const now       = moment();
//   const invoiceNo = 'INV' + now.format('YYMMDDHHmmss');
//   const dateStr   = now.format('YYYY-MM-DD');
//   const timeStr   = now.format('HH:mm:ss');

//   // 1) Create & pipe PDF
//   const doc = new PDFDocument({ size: 'A4', margin: 40 });
//   doc.pipe(res);

//   // 2) Draw header background
//   const headerHeight = 70;
//   doc
//     .rect(0, 0, doc.page.width, headerHeight)
//     .fill('#4B9CD3');

//   // 3) Fetch remote logo
//   const logoUrl = 'https://res.cloudinary.com/dcbx57wnb/image/upload/v1743321409/gocart_logo_name_d2z6gh.png';
//   try {
//     const { data: imageData } = await axios.get(logoUrl, { responseType: 'arraybuffer' });
//     const logoBuffer = Buffer.from(imageData, 'binary');
//     // draw it
//     doc.image(logoBuffer, 40, 15, { width: 40, height: 40 });
//   } catch (e) {
//     console.warn('Could not fetch logo:', e.message);
//   }

//   // 4) Invoice details in white
//   doc
//     .fillColor('#fff')
//     .fontSize(12)
//     .text(`Invoice No: ${invoiceNo}`, 100, 20, { continued: true })
//     .text(`Date: ${dateStr}`,           100, 36)
//     .text(`Time: ${timeStr}`,           100, 52);

//   // 5) Move below header
//   doc.fillColor('#000').moveDown(5);

//   // 6) Title
//   doc
//     .fontSize(18)
//     .fillColor('#333')
//     .text('Product Catalog', { align: 'center' })
//     .moveDown(1);

//   // 7) Fetch categories & render tables as before…
//   const categories = await Category.find().sort({ name: 1 }).lean();
//   for (const category of categories) {
//     const products = await Product.find({ category: category._id, isDeleted: false })
//       .sort({ name: 1 })
//       .lean();
//     if (!products.length) continue;

//     // Category header
//     doc
//       .fillColor('#4B9CD3')
//       .fontSize(14)
//       .text(category.name, { underline: true })
//       .moveDown(0.5);

//     // Column headers
//     const y0 = doc.y;
//     doc
//       .fontSize(10)
//       .fillColor('#000')
//       .text('No',            40,  y0)
//       .text('Product Name',  80,  y0)
//       .text('Unit',         200,  y0)
//       .text('Before Disc.', 260,  y0)
//       .text('After Disc.',  340,  y0)
//       .text('Last Edited',  420,  y0)
//       .text('Availability', 500,  y0);

//     // Underline
//     doc
//       .moveTo(40, y0 + 15)
//       .lineTo(560, y0 + 15)
//       .strokeColor('#aaa')
//       .stroke();

//     doc.moveDown(2);

//     // Rows
//     for (let i = 0; i < products.length; i++) {
//       const p    = products[i];
//       const rowY = doc.y;

//       doc
//         .fontSize(9)
//         .fillColor('#000')
//         .text(String(i + 1).padStart(2, '0'), 40,  rowY)
//         .text(p.name,                        80,  rowY)
//         .text('500 g',                      200,  rowY)
//         .text(`Rs ${p.priceBeforeDiscount.toFixed(2)}`, 260, rowY)
//         .text(`Rs ${p.priceAfterDiscount.toFixed(2)}`,   340, rowY)
//         .text(moment(p.updatedAt).fromNow(),             420, rowY);

//       // Availability badge
//       const badgeText  = p.availability ? 'Available' : 'Not Available';
//       const badgeColor = p.availability ? '#28a745'    : '#dc3545';
//       const textW      = doc.widthOfString(badgeText) + 6;
//       const textH      = 12;

//       doc
//         .rect(500, rowY + 2, textW, textH)
//         .fillColor(badgeColor)
//         .fill();

//       doc
//         .fillColor('#fff')
//         .fontSize(8)
//         .text(badgeText, 503, rowY + 3);

//       // Row separator
//       doc.moveDown();
//       doc
//         .moveTo(40, doc.y)
//         .lineTo(560, doc.y)
//         .strokeColor('#eee')
//         .stroke();

//       doc.moveDown(0.5);
//     }

//     doc.addPage();
//   }

//   // 8) Finish
//   doc.end();
// };

///////////////////////////////////////////

// utils/productPdfGenerator.js
// import PDFDocument from 'pdfkit';
// import axios from 'axios';
// import moment from 'moment';
// import Category from '../models/Category.js';
// import Product from '../models/Product.js';

// export const generateProductsPdf = async (res) => {
//   const now = moment();
//   const invoiceNo = 'INV' + now.format('YYMMDDHHmmss');
//   const dateStr = now.format('DD / MM / YYYY');
//   const timeStr = now.format('HH : mm');

//   const doc = new PDFDocument({ size: 'A4', margin: 40 });
//   doc.pipe(res);

//   async function drawHeader() {
//     const logoUrl = 'https://res.cloudinary.com/dcbx57wnb/image/upload/v1743321409/gocart_logo_name_d2z6gh.png';
//     try {
//       const { data: imageData } = await axios.get(logoUrl, { responseType: 'arraybuffer' });
//       const logoBuffer = Buffer.from(imageData, 'binary');
//       doc.image(logoBuffer, 40, 15, { width: 110 });
//     } catch (e) {
//       console.warn('Could not fetch logo:', e.message);
//     }

//     doc.font('Helvetica-Bold').fontSize(11).fillColor('#000');
//     doc.text(`Invoice No : ${invoiceNo}`, 380, 30);
//     doc.text(`Time : ${timeStr}`, 380, 45);
//     doc.text(`Date : ${dateStr}`, 380, 60);
//   }

//   await drawHeader();

//   let firstCategory = true;
//   const categories = await Category.find().sort({ name: 1 }).lean();

//   for (const category of categories) {
//     const products = await Product.find({ category: category._id, isDeleted: false }).sort({ name: 1 }).lean();
//     if (!products.length) continue;

//     if (!firstCategory) {
//       doc.addPage();
//       await drawHeader();
//     }
//     firstCategory = false;

//     doc.moveDown(2);

//     const tableTopY = doc.y;
//     const startX = 30;
//     const colWidths = [30, 160, 50, 70, 70, 80, 70];
//     const tableWidth = colWidths.reduce((a, b) => a + b, 0);

//     doc.roundedRect(startX, tableTopY, tableWidth, (products.length + 1) * 28 + 80, 10).fill('#F5F5F5');
//     doc.fillColor('#000').font('Helvetica-Bold').fontSize(16).text(category.name, 50, tableTopY + 20);

//     const headers = ['No', 'Product Name', 'Unit', 'Before Disc.', 'After Disc.', 'Last Edited', 'Available'];

//     let cursorY = tableTopY + 60;
//     let colX = startX;

//     doc.font('Helvetica-Bold').fontSize(12);
//     for (let i = 0; i < headers.length; i++) {
//       doc.text(headers[i], colX + 5, cursorY, { width: colWidths[i] - 10, align: 'center' });
//       colX += colWidths[i];
//     }

//     cursorY += 28;

//     for (let i = 0; i < products.length; i++) {
//       const p = products[i];
//       const badgeText = p.availability ? 'Available' : 'Not Available';
//       const badgeColor = p.availability ? '#28a745' : '#dc3545';

//       colX = startX;
//       const rowData = [
//         String(i + 1).padStart(2, '0'),
//         p.name,
//         p.unit || '500 g',
//         `Rs ${p.priceBeforeDiscount.toFixed(2)}`,
//         `Rs ${p.priceAfterDiscount.toFixed(2)}`,
//         moment(p.updatedAt).fromNow(),
//         ''
//       ];

//       doc.font('Helvetica').fontSize(11).fillColor('#000');
//       for (let j = 0; j < rowData.length - 1; j++) {
//         let alignOption = 'center';
//         if (j === 1) alignOption = 'left';
//         if (j === 3 || j === 4) alignOption = 'right';
//         doc.text(rowData[j], colX + 5, cursorY + 6, { width: colWidths[j] - 10, align: alignOption });
//         colX += colWidths[j];
//       }

//       doc.roundedRect(colX + 10, cursorY + 6, 60, 18, 5).fill(badgeColor);
//       doc.fillColor('#fff').font('Helvetica-Bold').fontSize(9)
//         .text(badgeText, colX + 10, cursorY + 10, { width: 60, align: 'center' });

//       cursorY += 28;
//     }
//   }

//   doc.end();
// };

// utils/productPdfGenerator.js
// import PDFDocument from 'pdfkit';
// import axios from 'axios';
// import moment from 'moment';
// import Category from '../models/Category.js';
// import Product from '../models/Product.js';

// export const generateProductsPdf = async (res) => {
//   const now = moment();
//   const invoiceNo = 'INV' + now.format('YYMMDDHHmmss');
//   const dateStr = now.format('DD / MM / YYYY');
//   const timeStr = now.format('HH : mm');

//   const doc = new PDFDocument({ size: 'A4', margin: 40 });
//   doc.pipe(res);

//   async function drawHeader() {
//     const logoUrl = 'https://res.cloudinary.com/dcbx57wnb/image/upload/v1743321409/gocart_logo_name_d2z6gh.png';
//     try {
//       const { data: imageData } = await axios.get(logoUrl, { responseType: 'arraybuffer' });
//       const logoBuffer = Buffer.from(imageData, 'binary');
//       doc.image(logoBuffer, 40, 15, { width: 110 });
//     } catch (e) {
//       console.warn('Could not fetch logo:', e.message);
//     }

//     doc.font('Helvetica-Bold')
//       .fontSize(22)
//       .fillColor('#FFA500')
//       .text('Product List - GoCart', { align: 'center' });

//     doc.moveDown(1);

//     doc.font('Helvetica-Bold').fontSize(11).fillColor('#000');
//     doc.text(`Invoice No : ${invoiceNo}`, 380, 30);
//     doc.text(`Time : ${timeStr}`, 380, 45);
//     doc.text(`Date : ${dateStr}`, 380, 60);
//     doc.text(`Address : 740 Sudarshana Road, Kelaniya`, 380, 75);
//     doc.text(`Email : GoCart@gmail.com`, 380, 90);
//   }

//   await drawHeader();

//   let firstCategory = true;
//   const categories = await Category.find().sort({ name: 1 }).lean();

//   for (const category of categories) {
//     const products = await Product.find({ category: category._id, isDeleted: false }).sort({ name: 1 }).lean();
//     if (!products.length) continue;

//     if (!firstCategory) {
//       doc.addPage();
//       await drawHeader();
//     }
//     firstCategory = false;

//     doc.moveDown(2);

//     const tableTopY = doc.y;
//     const startX = 30;
//     const colWidths = [30, 160, 50, 70, 70, 80, 70];
//     const tableWidth = colWidths.reduce((a, b) => a + b, 0);

//     doc.roundedRect(startX, tableTopY, tableWidth, (products.length + 1) * 28 + 80, 10).fill('#F5F5F5');
//     doc.fillColor('#000').font('Helvetica-Bold').fontSize(16).text(category.name, 50, tableTopY + 20);

//     const headers = ['No', 'Product Name', 'Unit', 'Before Disc.', 'After Disc.', 'Last Edited', 'Available'];

//     let cursorY = tableTopY + 60;
//     let colX = startX;

//     doc.font('Helvetica-Bold').fontSize(12);
//     for (let i = 0; i < headers.length; i++) {
//       doc.text(headers[i], colX + 5, cursorY, { width: colWidths[i] - 10, align: 'center' });
//       colX += colWidths[i];
//     }

//     cursorY += 28;

//     for (let i = 0; i < products.length; i++) {
//       const p = products[i];
//       const badgeText = p.availability ? 'Available' : 'Not Available';
//       const badgeColor = p.availability ? '#28a745' : '#dc3545';

//       colX = startX;
//       const rowData = [
//         String(i + 1).padStart(2, '0'),
//         p.name,
//         p.unit || '500 g',
//         `Rs ${p.priceBeforeDiscount.toFixed(2)}`,
//         `Rs ${p.priceAfterDiscount.toFixed(2)}`,
//         moment(p.updatedAt).fromNow(),
//         ''
//       ];

//       doc.font('Helvetica').fontSize(11).fillColor('#000');
//       for (let j = 0; j < rowData.length - 1; j++) {
//         let alignOption = 'center';
//         if (j === 1) alignOption = 'left';
//         if (j === 3 || j === 4) alignOption = 'right';
//         doc.text(rowData[j], colX + 5, cursorY + 6, { width: colWidths[j] - 10, align: alignOption });
//         colX += colWidths[j];
//       }

//       doc.roundedRect(colX + 10, cursorY + 6, 60, 18, 5).fill(badgeColor);
//       doc.fillColor('#fff').font('Helvetica-Bold').fontSize(9)
//         .text(badgeText, colX + 10, cursorY + 10, { width: 60, align: 'center' });

//       cursorY += 28;
//     }
//   }

//   doc.end();
// };

// utils/productPdfGenerator.js
// import PDFDocument from 'pdfkit';
// import axios from 'axios';
// import moment from 'moment';
// import Category from '../models/Category.js';
// import Product from '../models/Product.js';

// export const generateProductsPdf = async (res) => {
//   const now = moment();
//   const invoiceNo = 'INV' + now.format('YYMMDDHHmmss');
//   const dateStr = now.format('DD / MM / YYYY');
//   const timeStr = now.format('HH : mm');

//   const doc = new PDFDocument({ size: 'A4', margin: 40 });
//   doc.pipe(res);

//   async function drawHeader() {
//     const logoUrl = 'https://res.cloudinary.com/dcbx57wnb/image/upload/v1743321409/gocart_logo_name_d2z6gh.png';
//     try {
//       const { data: imageData } = await axios.get(logoUrl, { responseType: 'arraybuffer' });
//       const logoBuffer = Buffer.from(imageData, 'binary');
//       doc.image(logoBuffer, 40, 15, { width: 110 });
//     } catch (e) {
//       console.warn('Could not fetch logo:', e.message);
//     }

//     doc.moveDown(0.5);

//     doc.font('Helvetica-Bold')
//       .fontSize(22)
//       .fillColor('#FFA500')
//       .text('Product List - GoCart', { align: 'center' });

//     doc.moveDown(0.5);

//     doc.font('Helvetica-Bold').fontSize(11).fillColor('#000');
//     doc.text(`Invoice No : ${invoiceNo}`, 380, 80);
//     doc.text(`Time : ${timeStr}`, 380, 95);
//     doc.text(`Date : ${dateStr}`, 380, 110);
//     doc.text(`Address : 740 Sudarshana Road,`, 380, 125);
//     doc.text(`Kelaniya`, 380, 140);
//     doc.text(`Email : GoCart@gmail.com`, 380, 155);
//   }

//   await drawHeader();

//   let firstCategory = true;
//   const categories = await Category.find().sort({ name: 1 }).lean();

//   for (const category of categories) {
//     const products = await Product.find({ category: category._id, isDeleted: false }).sort({ name: 1 }).lean();
//     if (!products.length) continue;

//     if (!firstCategory) {
//       doc.addPage();
//       await drawHeader();
//     }
//     firstCategory = false;

//     doc.moveDown(2);

//     const tableTopY = doc.y;
//     const startX = 30;
//     const colWidths = [30, 160, 50, 70, 70, 80, 70];
//     const tableWidth = colWidths.reduce((a, b) => a + b, 0);

//     doc.roundedRect(startX, tableTopY, tableWidth, (products.length + 1) * 28 + 80, 10).fill('#F5F5F5');
//     doc.fillColor('#000').font('Helvetica-Bold').fontSize(16).text(category.name, 50, tableTopY + 20);

//     const headers = ['No', 'Product Name', 'Unit', 'Before Disc.', 'After Disc.', 'Last Edited', 'Available'];

//     let cursorY = tableTopY + 60;
//     let colX = startX;

//     doc.font('Helvetica-Bold').fontSize(12);
//     for (let i = 0; i < headers.length; i++) {
//       doc.text(headers[i], colX + 5, cursorY, { width: colWidths[i] - 10, align: 'center' });
//       colX += colWidths[i];
//     }

//     cursorY += 28;

//     for (let i = 0; i < products.length; i++) {
//       const p = products[i];
//       const badgeText = p.availability ? 'Available' : 'Not Available';
//       const badgeColor = p.availability ? '#28a745' : '#dc3545';

//       colX = startX;
//       const rowData = [
//         String(i + 1).padStart(2, '0'),
//         p.name,
//         p.unit || '500 g',
//         `Rs ${p.priceBeforeDiscount.toFixed(2)}`,
//         `Rs ${p.priceAfterDiscount.toFixed(2)}`,
//         moment(p.updatedAt).fromNow(),
//         ''
//       ];

//       doc.font('Helvetica').fontSize(11).fillColor('#000');
//       for (let j = 0; j < rowData.length - 1; j++) {
//         let alignOption = 'center';
//         if (j === 1) alignOption = 'left';
//         if (j === 3 || j === 4) alignOption = 'right';
//         doc.text(rowData[j], colX + 5, cursorY + 6, { width: colWidths[j] - 10, align: alignOption });
//         colX += colWidths[j];
//       }

//       doc.roundedRect(colX + 10, cursorY + 6, 60, 18, 5).fill(badgeColor);
//       doc.fillColor('#fff').font('Helvetica-Bold').fontSize(9)
//         .text(badgeText, colX + 10, cursorY + 10, { width: 60, align: 'center' });

//       cursorY += 28;
//     }
//   }

//   doc.end();
// };

// utils/productPdfGenerator.js
// import PDFDocument from 'pdfkit';
// import axios from 'axios';
// import moment from 'moment';
// import Category from '../models/Category.js';
// import Product from '../models/Product.js';

// export const generateProductsPdf = async (res) => {
//   const now = moment();
//   const invoiceNo = 'INV' + now.format('YYMMDDHHmmss');
//   const dateStr = now.format('DD / MM / YYYY');
//   const timeStr = now.format('HH : mm');

//   const doc = new PDFDocument({ size: 'A4', margin: 40 });
//   doc.pipe(res);

//   async function drawHeader() {
//     const logoUrl = 'https://res.cloudinary.com/dcbx57wnb/image/upload/v1743321409/gocart_logo_name_d2z6gh.png';
//     try {
//       const { data: imageData } = await axios.get(logoUrl, { responseType: 'arraybuffer' });
//       const logoBuffer = Buffer.from(imageData, 'binary');
//       doc.image(logoBuffer, 40, 15, { width: 110 });
//     } catch (e) {
//       console.warn('Could not fetch logo:', e.message);
//     }

//     doc.moveDown(0.5);

//     doc.font('Helvetica-Bold')
//       .fontSize(22)
//       .fillColor('#FFA500')
//       .text('Product List - GoCart', { align: 'center' });

//     doc.moveDown(0.5);

//     doc.font('Helvetica-Bold').fontSize(11).fillColor('#000');
//     doc.text(`Address : 740 Sudarshana Road,`, 40, 80);
//     doc.text(`Kelaniya`, 40, 95);
//     doc.text(`Email : GoCart@gmail.com`, 40, 110);

//     doc.text(`Invoice No : ${invoiceNo}`, 380, 80);
//     doc.text(`Time : ${timeStr}`, 380, 95);
//     doc.text(`Date : ${dateStr}`, 380, 110);
//   }

//   await drawHeader();

//   let firstCategory = true;
//   const categories = await Category.find().sort({ name: 1 }).lean();

//   for (const category of categories) {
//     const products = await Product.find({ category: category._id, isDeleted: false }).sort({ name: 1 }).lean();
//     if (!products.length) continue;

//     if (!firstCategory) {
//       doc.addPage();
//       await drawHeader();
//     }
//     firstCategory = false;

//     doc.moveDown(2);

//     const tableTopY = doc.y;
//     const startX = 30;
//     const colWidths = [30, 160, 50, 70, 70, 80, 70];
//     const tableWidth = colWidths.reduce((a, b) => a + b, 0);

//     doc.roundedRect(startX, tableTopY, tableWidth, (products.length + 1) * 28 + 80, 10).fill('#F5F5F5');
//     doc.fillColor('#000').font('Helvetica-Bold').fontSize(16).text(category.name, 50, tableTopY + 20);

//     const headers = ['No', 'Product Name', 'Unit', 'Before Disc.', 'After Disc.', 'Last Edited', 'Available'];

//     let cursorY = tableTopY + 60;
//     let colX = startX;

//     doc.font('Helvetica-Bold').fontSize(12);
//     for (let i = 0; i < headers.length; i++) {
//       doc.text(headers[i], colX + 5, cursorY, { width: colWidths[i] - 10, align: 'center' });
//       colX += colWidths[i];
//     }

//     cursorY += 28;

//     for (let i = 0; i < products.length; i++) {
//       const p = products[i];
//       const badgeText = p.availability ? 'Available' : 'Not Available';
//       const badgeColor = p.availability ? '#28a745' : '#dc3545';

//       colX = startX;
//       const rowData = [
//         String(i + 1).padStart(2, '0'),
//         p.name,
//         p.unit || '500 g',
//         `Rs ${p.priceBeforeDiscount.toFixed(2)}`,
//         `Rs ${p.priceAfterDiscount.toFixed(2)}`,
//         moment(p.updatedAt).fromNow(),
//         ''
//       ];

//       doc.font('Helvetica').fontSize(11).fillColor('#000');
//       for (let j = 0; j < rowData.length - 1; j++) {
//         let alignOption = 'center';
//         if (j === 1) alignOption = 'left';
//         if (j === 3 || j === 4) alignOption = 'right';
//         doc.text(rowData[j], colX + 5, cursorY + 6, { width: colWidths[j] - 10, align: alignOption });
//         colX += colWidths[j];
//       }

//       doc.roundedRect(colX + 10, cursorY + 6, 60, 18, 5).fill(badgeColor);
//       doc.fillColor('#fff').font('Helvetica-Bold').fontSize(9)
//         .text(badgeText, colX + 10, cursorY + 10, { width: 60, align: 'center' });

//       cursorY += 28;
//     }
//   }

//   doc.end();
// };

// utils/productPdfGenerator.js
// import PDFDocument from 'pdfkit';
// import axios from 'axios';
// import moment from 'moment';
// import Category from '../models/Category.js';
// import Product from '../models/Product.js';

// export const generateProductsPdf = async (res) => {
//   const now = moment();
//   const invoiceNo = 'INV' + now.format('YYMMDDHHmmss');
//   const dateStr = now.format('DD / MM / YYYY');
//   const timeStr = now.format('HH : mm');

//   const doc = new PDFDocument({ size: 'A4', margin: 40 });
//   doc.pipe(res);

//   async function drawHeader() {
//     const logoUrl = 'https://res.cloudinary.com/dcbx57wnb/image/upload/v1743321409/gocart_logo_name_d2z6gh.png';
//     try {
//       const { data: imageData } = await axios.get(logoUrl, { responseType: 'arraybuffer' });
//       const logoBuffer = Buffer.from(imageData, 'binary');
//       doc.image(logoBuffer, 40, 20, { width: 110 });
//     } catch (e) {
//       console.warn('Could not fetch logo:', e.message);
//     }

//     doc.font('Helvetica-Bold')
//       .fontSize(22)
//       .fillColor('#FFA500')//#000
//       .text('Product List - GoCart', 160, 40);

//     doc.font('Helvetica-Bold').fontSize(11).fillColor('#000');
//     doc.text(`Address : 740 Sudarshana Road,`, 40, 80);
//     doc.text(`Kelaniya`, 40, 95);
//     doc.text(`Email : GoCart@gmail.com`, 40, 110);

//     doc.text(`Invoice No : ${invoiceNo}`, 380, 80);
//     doc.text(`Time : ${timeStr}`, 380, 95);
//     doc.text(`Date : ${dateStr}`, 380, 110);
//   }

//   await drawHeader();

//   let firstCategory = true;
//   const categories = await Category.find().sort({ name: 1 }).lean();

//   for (const category of categories) {
//     const products = await Product.find({ category: category._id, isDeleted: false }).sort({ name: 1 }).lean();
//     if (!products.length) continue;

//     if (!firstCategory) {
//       doc.addPage();
//       await drawHeader();
//     }
//     firstCategory = false;

//     doc.moveDown(2);

//     const tableTopY = doc.y;
//     const startX = 30;
//     const colWidths = [30, 160, 50, 70, 70, 80, 70];
//     const tableWidth = colWidths.reduce((a, b) => a + b, 0);

//     doc.roundedRect(startX, tableTopY, tableWidth, (products.length + 1) * 28 + 80, 10).fill('#F5F5F5');
//     doc.fillColor('#000').font('Helvetica-Bold').fontSize(16).text(category.name, 50, tableTopY + 20);

//     const headers = ['No', 'Product Name', 'Unit', 'Before Disc.', 'After Disc.', 'Last Edited', 'Available'];

//     let cursorY = tableTopY + 60;
//     let colX = startX;

//     doc.font('Helvetica-Bold').fontSize(12);
//     for (let i = 0; i < headers.length; i++) {
//       doc.text(headers[i], colX + 5, cursorY, { width: colWidths[i] - 10, align: 'center' });
//       colX += colWidths[i];
//     }

//     cursorY += 28;

//     for (let i = 0; i < products.length; i++) {
//       const p = products[i];
//       const badgeText = p.availability ? 'Available' : 'Not Available';
//       const badgeColor = p.availability ? '#28a745' : '#dc3545';

//       colX = startX;
//       const rowData = [
//         String(i + 1).padStart(2, '0'),
//         p.name,
//         p.unit || '500 g',
//         `Rs ${p.priceBeforeDiscount.toFixed(2)}`,
//         `Rs ${p.priceAfterDiscount.toFixed(2)}`,
//         moment(p.updatedAt).fromNow(),
//         ''
//       ];

//       doc.font('Helvetica').fontSize(11).fillColor('#000');
//       for (let j = 0; j < rowData.length - 1; j++) {
//         let alignOption = 'center';
//         if (j === 1) alignOption = 'left';
//         if (j === 3 || j === 4) alignOption = 'right';
//         doc.text(rowData[j], colX + 5, cursorY + 6, { width: colWidths[j] - 10, align: alignOption });
//         colX += colWidths[j];
//       }

//       doc.roundedRect(colX + 10, cursorY + 6, 60, 18, 5).fill(badgeColor);
//       doc.fillColor('#fff').font('Helvetica-Bold').fontSize(9)
//         .text(badgeText, colX + 10, cursorY + 10, { width: 60, align: 'center' });

//       cursorY += 28;
//     }
//   }

//   doc.end();
// };

// utils/productPdfGenerator.js
// top of file

//////////////////////////////////////////////////////////////////////////////////////////////
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname  = path.dirname(__filename);
// import PDFDocument from 'pdfkit';
// import axios from 'axios';
// import moment from 'moment';
// import Category from '../models/Category.js';
// import Product from '../models/Product.js';
// // import logo from "../../components/logo1.png"; 

// export const generateProductsPdf = async (res) => {
//   const now = moment();
//   const invoiceNo = 'INV' + now.format('YYMMDDHHmmss');
//   const dateStr = now.format('DD / MM / YYYY');
//   const timeStr = now.format('HH : mm');

//   const doc = new PDFDocument({ size: 'A4', margin: 40 });
//   doc.pipe(res);

//   async function drawHeader() {
//     const LOGO_PATH = path.join(__dirname, '..', '..', 'public', 'brand', 'logo1.png');
//     // const logoUrl = 'https://res.cloudinary.com/dcbx57wnb/image/upload/v1743321409/gocart_logo_name_d2z6gh.png';
//     const logoUrl = 'https://res.cloudinary.com/dcbx57wnb/image/upload/v1755454975/shopzy_logo_u7sbe6.png';
//     try {
//       const { data: imageData } = await axios.get(logoUrl, { responseType: 'arraybuffer' });
//       const logoBuffer = Buffer.from(imageData, 'binary');
//       doc.image(logoBuffer, 40, 20, { width: 110 });
//     } catch (e) {
//       console.warn('Could not fetch logo:', e.message);
//     }

//     doc.font('Helvetica-Bold')
//       .fontSize(22)
//       .fillColor('#393E46')//#000 //FFA500
//       .text('Product - Catalog | Shopzy', { align: 'center' });

//     doc.moveDown(1);

//     doc.font('Helvetica-Bold').fontSize(11).fillColor('#000');
//     doc.text(`Address : 740 Sudarshana Road,`, 40, 80);
//     doc.text(`Kelaniya`, 40, 95);
//     doc.text(`Email : Shopzy@gmail.com`, 40, 110);

//     doc.text(`Invoice No : ${invoiceNo}`, 380, 80);
//     doc.text(`Time : ${timeStr}`, 380, 95);
//     doc.text(`Date : ${dateStr}`, 380, 110);
//   }

//   await drawHeader();

//   let firstCategory = true;
//   const categories = await Category.find().sort({ name: 1 }).lean();

//   for (const category of categories) {
//     const products = await Product.find({ category: category._id, isDeleted: false }).sort({ name: 1 }).lean();
//     if (!products.length) continue;

//     if (!firstCategory) {
//       doc.addPage();
//       await drawHeader();
//     }
//     firstCategory = false;

//     doc.moveDown(2);

//     const tableTopY = doc.y;
//     const startX = 30;
//     const colWidths = [30, 160, 50, 70, 70, 80, 70];
//     const tableWidth = colWidths.reduce((a, b) => a + b, 0);

//     doc.roundedRect(startX, tableTopY, tableWidth, (products.length + 1) * 28 + 80, 10).fill('#F5F5F5');
//     doc.fillColor('#000').font('Helvetica-Bold').fontSize(16).text(category.name, 50, tableTopY + 20);

//     const headers = ['No', 'Product Name', 'Unit', 'Before Disc.', 'After Disc.', 'Last Edited', 'Available'];

//     let cursorY = tableTopY + 60;
//     let colX = startX;

//     doc.font('Helvetica-Bold').fontSize(12);
//     for (let i = 0; i < headers.length; i++) {
//       doc.text(headers[i], colX + 5, cursorY, { width: colWidths[i] - 10, align: 'center' });
//       colX += colWidths[i];
//     }

//     cursorY += 28;

//     for (let i = 0; i < products.length; i++) {
//       const p = products[i];
//       const badgeText = p.availability ? 'Available' : 'Not Available';
//       const badgeColor = p.availability ? '#28a745' : '#dc3545';

//       colX = startX;
//       const rowData = [
//         String(i + 1).padStart(2, '0'),
//         p.name,
//         p.unit || '500 g',
//         `Rs ${p.priceBeforeDiscount.toFixed(2)}`,
//         `Rs ${p.priceAfterDiscount.toFixed(2)}`,
//         moment(p.updatedAt).fromNow(),
//         ''
//       ];

//       doc.font('Helvetica').fontSize(11).fillColor('#000');
//       for (let j = 0; j < rowData.length - 1; j++) {
//         let alignOption = 'center';
//         if (j === 1) alignOption = 'left';
//         if (j === 3 || j === 4) alignOption = 'right';
//         doc.text(rowData[j], colX + 5, cursorY + 6, { width: colWidths[j] - 10, align: alignOption });
//         colX += colWidths[j];
//       }

//       doc.roundedRect(colX + 10, cursorY + 6, 60, 18, 5).fill(badgeColor);
//       doc.fillColor('#fff').font('Helvetica-Bold').fontSize(9)
//         .text(badgeText, colX + 10, cursorY + 10, { width: 60, align: 'center' });

//       cursorY += 28;
//     }
//   }

//   doc.end();
// };
/////////////////////////////////////////////////////
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

import PDFDocument from 'pdfkit';
import axios from 'axios';
import moment from 'moment';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

// -----------------------------------------------------------------------------
// Product Catalog PDF — Cloud logo on ALL pages (1st: top-left, others: top-right)
// Clean prices (no strike), perfect-fit table, category-first unit logic
// -----------------------------------------------------------------------------
export const generateProductsPdf = async (res) => {
  // Meta
  const now       = moment();
  const invoiceNo = 'INV' + now.format('YYMMDDHHmmss');
  const dateStr   = now.format('DD / MM / YYYY');
  const timeStr   = now.format('HH : mm');

  // PDF
  const doc = new PDFDocument({ size: 'A4', margin: 36 });
  doc.pipe(res);

  // Theme
  const textDark  = '#222222';
  const lineGrey  = '#E6E8EC';
  const goodGreen = '#27AE60';
  const badRed    = '#D23F3F';
  const ROW_H     = 24;

  // Geometry
  const X_START = () => doc.page.margins.left;
  const AVAIL_W = () => doc.page.width - doc.page.margins.left - doc.page.margins.right;

  // Columns (fit within page)
  function computeColumns() {
    const usable = AVAIL_W(); // ~523 on A4
    const FIX = { no: 34, unit: 52, before: 78, after: 78, last: 64, avail: 90 };
    const fixedSum = FIX.no + FIX.unit + FIX.before + FIX.after + FIX.last + FIX.avail; // 396
    const product = Math.max(140, usable - fixedSum);
    const colWs = [FIX.no, product, FIX.unit, FIX.before, FIX.after, FIX.last, FIX.avail];
    const colXs = [];
    let x = X_START();
    for (const w of colWs) { colXs.push(x); x += w; }
    return { colWs, colXs };
  }

  // Helpers
  const formatRs = (n) => `Rs ${Number(n || 0).toFixed(2)}`;
  const shortAgo = (d) => {
    if (!d) return '-';
    const s = moment().diff(moment(d), 'seconds');
    if (s < 60) return 'now';
    if (s < 3600) return `${Math.floor(s/60)}m ago`;
    if (s < 86400) return `${Math.floor(s/3600)}h ago`;
    if (s < 2592000) return `${Math.floor(s/86400)}d ago`;
    if (s < 31104000) return `${Math.floor(s/2592000)}mo ago`;
    return `${Math.floor(s/31104000)}y ago`;
  };
  function cellText(text, x, y, width, align = 'left', bold = false, color = textDark) {
    doc.save();
    doc.fillColor(color).font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(10)
       .text(String(text ?? '-'), x, y, { width, align, lineBreak: false, ellipsis: true });
    doc.restore();
  }
  function availabilityBadge(text, x, y, width) {
    doc.save();
    const color = text.toLowerCase().includes('not') ? badRed : goodGreen;
    const h = 16;
    const w = Math.min(width - 8, 92);
    const bx = x + (width - w) / 2;
    const by = y + (ROW_H - h) / 2;
    doc.roundedRect(bx, by, w, h, 8).fill(color);
    doc.fillColor('#fff').font('Helvetica-Bold').fontSize(9)
       .text(text, bx, by + 3, { width: w, align: 'center', lineBreak: false });
    doc.restore();
  }

  // Word-boundary match helpers (avoid “water” hitting “watermelon”)
  const escapeRx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const hasWord = (hay, word) => new RegExp(`\\b${escapeRx(word)}\\b`, 'i').test(hay);
  const hasAnyWord = (hay, words) => words.some(w => hasWord(hay, w));

  // Category-first unit resolver + product overrides (word boundaries)
  function unitFor(categoryName = '', productName = '', existingUnit = '') {
    const unit = (existingUnit || '').toString().trim();
    if (unit) return unit;

    const cat = String(categoryName || '').toLowerCase();
    const pn  = String(productName || '').toLowerCase();

    let byCategory =
      (cat.includes('fruit') || cat.includes('vegetable')) ? '500g' :
      (cat.includes('meat')  || cat.includes('fish'))      ? '1kg'  :
      (cat.includes('snack') || cat.includes('sweet'))     ? '200g' :
      (cat.includes('frozen'))                              ? '500g' :
      (cat.includes('personal care'))                       ? '500ml':
      (cat.includes('beverage'))                            ? '1L'   :
      (cat.includes('spice'))                               ? '100g' :
      (cat.includes('staple'))                              ? '1kg'  :
      (cat.includes('laundry') || cat.includes('cleaning')) ? '1L'   :
      (cat.includes('dairy'))                               ? '500g' :
      null;

    const override =
      hasWord(pn, 'egg')            ? '12pcs' :
      hasWord(pn, 'milk')           ? '1L'    :
      hasWord(pn, 'oil')            ? '1L'    :
      hasWord(pn, 'toothpaste')     ? '100ml' :
      hasWord(pn, 'body wash')      ? '500ml' :
      hasWord(pn, 'shampoo')        ? '500ml' :
      hasWord(pn, 'conditioner')    ? '500ml' :
      hasWord(pn, 'mouthwash')      ? '500ml' :
      hasWord(pn, 'soap')           ? '100g'  :
      hasWord(pn, 'detergent')      ? '1kg'   :
      hasWord(pn, 'flour')          ? '1kg'   :
      hasWord(pn, 'rice')           ? '1kg'   :
      hasWord(pn, 'salt')           ? '1kg'   :
      hasWord(pn, 'sugar')          ? '1kg'   :
      hasWord(pn, 'tea')            ? '200g'  :
      hasWord(pn, 'coffee')         ? '200g'  :
      hasWord(pn, 'coconut water')  ? '1L'    :
      hasWord(pn, 'water')          ? '1L'    :
      hasWord(pn, 'wine')           ? '750ml' :
      hasWord(pn, 'beer')           ? '500ml' :
      hasWord(pn, 'juice')          ? '1L'    :
      hasWord(pn, 'yogurt')         ? '500g'  :
      hasWord(pn, 'cheese')         ? '500g'  :
      hasWord(pn, 'butter')         ? '500g'  :
      hasWord(pn, 'ice cream')      ? '500ml' :
      hasWord(pn, 'pizza')          ? '1pc'   :
      hasWord(pn, 'nuggets')        ? '500g'  :
      hasWord(pn, 'pretzel')        ? '200g'  :
      hasWord(pn, 'chips')          ? '200g'  :
      hasWord(pn, 'cookies')        ? '200g'  :
      hasWord(pn, 'candy')          ? '200g'  :
      hasAnyWord(pn, ['granola', 'protein bar', 'bars']) ? '200g' :
      hasAnyWord(pn, ['spice', 'turmeric', 'pepper', 'cumin', 'basil', 'oregano', 'paprika', 'rosemary', 'chili', 'curry', 'garlic', 'onion']) ? '100g' :
      null;

    return override || byCategory || '1pc';
  }

  // ---------- Load Cloudinary logo ONCE (use everywhere)
  const cloudLogo = 'https://res.cloudinary.com/dcbx57wnb/image/upload/v1755454975/shopzy_logo_u7sbe6.png';
  let logoBuf = null;
  try {
    const { data } = await axios.get(cloudLogo, { responseType: 'arraybuffer' });
    logoBuf = Buffer.from(data, 'binary');
  } catch (_) {
    // If it fails, we'll render without logo (layout stays fine)
  }

  // ---------- First page header (logo at top-left; big title centered)
  function drawHeader() {
    // Logo at the exact spot you circled (top-left, near the title)
    if (logoBuf) {
      try { doc.image(logoBuf, X_START(), 12, { width: 130 }); } catch {}
    }

    doc.fillColor(textDark).font('Helvetica-Bold').fontSize(28)
       .text('Product Catalog', 0, 20, { align: 'center' });

    // Info card
    const yBar = 70;
    doc.roundedRect(X_START(), yBar, AVAIL_W(), 56, 10).fill('#F7F9FC');
    doc.fillColor(textDark).font('Helvetica-Bold').fontSize(11)
       .text('Shopzy', X_START() + 14, yBar + 10);
    doc.font('Helvetica').fontSize(10)
       .text('Address: 740 Sudarshana Road, Kelaniya', X_START() + 14, yBar + 26)
       .text('Email: Shopzy@gmail.com',               X_START() + 14, yBar + 40);

    const rightW = 260;
    const rightX = X_START() + AVAIL_W() - rightW - 10;
    doc.font('Helvetica-Bold').fontSize(11)
       .text(`Invoice: ${invoiceNo}`, rightX, yBar + 10, { width: rightW, align: 'right' })
       .font('Helvetica').fontSize(10)
       .text(`Date: ${dateStr}`,      rightX, yBar + 26, { width: rightW, align: 'right' })
       .text(`Time: ${timeStr}`,      rightX, yBar + 40, { width: rightW, align: 'right' });

    doc.moveTo(X_START(), yBar + 56).lineTo(X_START() + AVAIL_W(), yBar + 56)
       .strokeColor(lineGrey).lineWidth(1).stroke();

    doc.y = yBar + 78;
  }

  // ---------- Compact header for EVERY non-first page (logo at top-right)
  function newPageWithHeader() {
    doc.addPage();

    const topY = 20;
    if (logoBuf) {
      try { doc.image(logoBuf, X_START() + AVAIL_W() - 110, topY - 2, { width: 110 }); } catch {}
    }

    doc.fillColor(textDark).font('Helvetica-Bold').fontSize(12)
       .text('Shopzy Catalog', X_START(), topY + 2);
    doc.font('Helvetica').fontSize(9).fillColor('#666')
       .text(`${dateStr} • ${timeStr} • ${invoiceNo}`, X_START(), topY + 18);

    doc.moveTo(X_START(), 56).lineTo(X_START() + AVAIL_W(), 56)
       .strokeColor(lineGrey).lineWidth(1).stroke();
    doc.y = 72;
  }

  function drawSectionCard(title, hint = '') {
    const top = doc.y;
    doc.font('Helvetica-Bold').fontSize(14).fillColor(textDark).text(title, X_START(), top);
    if (hint) doc.font('Helvetica').fontSize(9).fillColor('#666').text(hint, X_START(), top + 18);
    doc.moveDown(1.2);
  }

  function drawTableHeader(colXs, colWs) {
    const thY = doc.y + 2;
    doc.rect(X_START(), thY - 6, AVAIL_W(), 24).fill('#EEF3FA');
    doc.fillColor(textDark).font('Helvetica-Bold').fontSize(10);
    ['No','Product','Unit','Before Disc.','After Disc.','Last Edited','Availability']
      .forEach((h, i) => cellText(h, colXs[i], thY, colWs[i], i === 1 ? 'left' : 'center', true));
    doc.moveTo(X_START(), thY + 20).lineTo(X_START() + AVAIL_W(), thY + 20)
       .strokeColor(lineGrey).lineWidth(1).stroke();
    doc.y = thY + 20;
  }

  // ---------- Data (sorted by most recent updates)
  const rawCategories = await Category.find().lean();

  const catWithProducts = [];
  for (const cat of rawCategories) {
    const prods = await Product.find({ category: cat._id, isDeleted: false })
      .sort({ updatedAt: -1 })
      .lean();
    if (!prods.length) continue;
    const latestUpdatedAt = prods[0]?.updatedAt ? new Date(prods[0].updatedAt).getTime() : 0;
    catWithProducts.push({ category: cat, products: prods, latestUpdatedAt });
  }
  catWithProducts.sort((a, b) => b.latestUpdatedAt - a.latestUpdatedAt);

  // ---------- Render
  drawHeader();

  let firstCategory = true;
  for (const { category, products } of catWithProducts) {
    if (!firstCategory) newPageWithHeader();
    firstCategory = false;

    drawSectionCard(category.name, 'Sorted by most recent updates');

    const { colWs, colXs } = computeColumns();
    drawTableHeader(colXs, colWs);

    let idx = 0;
    for (const p of products) {
      // page guard
      if (doc.y + ROW_H + 40 > doc.page.height - doc.page.margins.bottom) {
        newPageWithHeader();
        drawSectionCard(category.name, 'Continued…');
        drawTableHeader(colXs, colWs);
      }

      const y = doc.y;

      // zebra
      if (idx % 2 === 0) {
        doc.save();
        doc.rect(X_START(), y, AVAIL_W(), ROW_H).fill('#FBFCFE');
        doc.restore();
      }

      // divider
      doc.moveTo(X_START(), y + ROW_H).lineTo(X_START() + AVAIL_W(), y + ROW_H)
         .strokeColor(lineGrey).lineWidth(0.7).stroke();

      // values
      const numStr     = String(idx + 1).padStart(2, '0');
      const before     = formatRs(p.priceBeforeDiscount);
      const after      = formatRs(p.priceAfterDiscount);
      const edited     = shortAgo(p.updatedAt);
      const availTxt   = p.availability ? 'Available' : 'Not Available';
      const unitVal    = unitFor(category.name, p.name, p.unit);
      const discounted = (p.priceAfterDiscount ?? 0) < (p.priceBeforeDiscount ?? 0);
      const ty         = y + (ROW_H - 12) / 2;

      cellText(numStr,        colXs[0], ty, colWs[0], 'center');
      cellText(p.name||'-',   colXs[1], ty, colWs[1], 'left');
      cellText(unitVal,       colXs[2], ty, colWs[2], 'center');

      // Before Disc. — plain grey price
      cellText(before,        colXs[3], ty, colWs[3], 'right', false, '#666');

      // After Disc. — bold green if discounted
      cellText(after,         colXs[4], ty, colWs[4], 'right', discounted, discounted ? goodGreen : textDark);

      cellText(edited,        colXs[5], ty, colWs[5], 'center');
      availabilityBadge(availTxt, colXs[6], y,  colWs[6]);

      doc.y = y + ROW_H;
      idx++;
    }

    // Section summary
    const total = products.length;
    const inStock = products.filter(p => !!p.availability).length;
    const oos = total - inStock;
    doc.moveDown(0.4);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(textDark)
       .text(`Items: ${total}   •   Available: ${inStock}   •   Not Available: ${oos}`, X_START(), doc.y);
    doc.moveDown(0.5);
    doc.moveTo(X_START(), doc.y).lineTo(X_START() + AVAIL_W(), doc.y)
       .strokeColor(lineGrey).lineWidth(1).stroke();
    doc.moveDown(0.8);
  }

  // Footer
  doc.moveDown(1.2);
  doc.font('Helvetica-Bold').fontSize(11).fillColor(textDark)
     .text('Thank you for shopping with Shopzy!', { align: 'center' });
  doc.font('Helvetica').fontSize(9).fillColor('#666')
     .text('For questions about this catalog, contact: Shopzy@gmail.com', { align: 'center' });

  doc.end();
};
