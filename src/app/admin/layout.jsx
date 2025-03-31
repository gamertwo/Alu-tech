// app/admin/layout.jsx
import { Metadata } from 'next';

export const metadata = {
  title: 'Admin Dashboard | Meeting Requests | White Gold Aluminum',
  description: 'Manage and track product consultation requests from customers',
};

export default function AdminLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}