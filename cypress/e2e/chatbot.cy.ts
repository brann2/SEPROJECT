/// <reference types="cypress" />

describe('Chatbot Feature', () => {
    beforeEach(() => {
      // Lakukan login untuk memastikan keadaan aplikasi yang konsisten.
      cy.visit('/login');
      cy.get('input[name="email"]').type('slapking430@gmail.com');
      cy.get('input[name="password"]').type('qwer1234');
      cy.contains('button', 'Masuk').click();
      
      cy.url().should('include', '/', { timeout: 10000 });
  
      // Navigasi ke halaman chatbot dan verifikasi URL-nya.
      cy.visit('/chatbot');
      cy.url().should('include', '/chatbot');
    });
  
    it('should receive a response after sending a message', () => {
      const userMessage = 'Apa itu kesehatan mental?';
  
      // Cari semua paragraf pesan. Awalnya hanya ada 1 dari bot.
      // Elemen `<p>` dengan kelas `text-sm` adalah penampung teks pesan.
      cy.get('p.text-sm').should('have.length', 1);
  
      // Temukan input di dalam form, ketik pesan, lalu kirim.
      cy.get('form').find('input').type(userMessage);
      cy.get('form').submit();
  
      // Pesan dari pengguna harus langsung muncul di layar.
      cy.contains(userMessage).should('be.visible');
  
      // Sekarang, tunggu hingga bot merespons. Setelah respons masuk,
      // total paragraf pesan akan menjadi 3 (salam bot + pesan user + respons bot).
      // Kita beri waktu tunggu lebih lama karena AI butuh waktu untuk berpikir.
      cy.get('p.text-sm', { timeout: 20000 }).should('have.length', 3);
    });
  });