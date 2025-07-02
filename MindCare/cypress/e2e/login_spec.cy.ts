/// <reference types="cypress" />

describe('Login Page Test', () => {
  it('should display the login page correctly', () => {
    // Kunjungi halaman login
    cy.visit('http://localhost:5173/login');

    // Pastikan elemen-elemen penting ada di halaman
    cy.contains('h1', 'Welcome back').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should allow a user to type into the email and password fields', () => {
    cy.visit('http://localhost:5173/login');

    const testEmail = 'test@example.com';
    const testPassword = 'password123';

    // Ketik di kolom email
    cy.get('input[name="email"]')
      .type(testEmail)
      .should('have.value', testEmail);

    // Ketik di kolom password
    cy.get('input[name="password"]')
      .type(testPassword)
      .should(el => {
        if (el.val() !== testPassword) {
          throw new Error('Password value is incorrect')
        }
      });
  });

  it('should show an error for invalid credentials', () => {
    cy.visit('http://localhost:5173/login');

    // Isi dengan kredensial yang salah
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Pastikan pesan error muncul (sesuaikan dengan implementasi Anda)
    // Untuk saat ini, kita hanya akan memeriksa URL tidak berubah
    cy.url().should('include', '/login');
  });
}); 