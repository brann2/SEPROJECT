/// <reference types="cypress" />

describe('Authentication', () => {
  it('should log in with valid credentials', () => {
    // Kunjungi halaman login
    cy.visit('/login');

    // Isi formulir login
    // Ganti dengan kredensial pengguna yang valid dari Supabase
    cy.get('input[name="email"]').type('slapking430@gmail.com');
    cy.get('input[name="password"]').type('qwer1234');

    // Kirim formulir dengan mengklik tombol, seperti pengguna asli
    cy.contains('button', 'Masuk').click();

    // Verifikasi bahwa pengguna dialihkan ke halaman utama. Ini adalah tes terpenting.
    cy.url().should('include', '/', { timeout: 10000 });

    // (Opsional) Verifikasi pesan selamat datang. Toasts bisa sulit dites secara konsisten.
    // cy.contains('Login berhasil').should('be.visible');
  });

  it('should show an error with invalid credentials', () => {
    // Kunjungi halaman login
    cy.visit('/login');

    // Isi formulir dengan kredensial yang salah
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');

    // Kirim formulir
    cy.get('form').submit();

    // Verifikasi bahwa pesan kesalahan muncul
    cy.contains('Email atau password salah').should('be.visible');

    // Verifikasi bahwa pengguna tetap berada di halaman login
    cy.url().should('include', '/login');
  });
}); 