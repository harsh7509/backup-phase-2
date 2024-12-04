'use client';

import { useEffect, useState } from 'react';

interface Crop {
  name: string;
  price?: number;
}

interface Farmer {
  _id: string;
  name: string;
  crops: Crop[];
}

interface Requirement {
  cropName: string;
  budget?: number;
}

interface Dealer {
  _id: string;
  name: string;
  requirements: Requirement[];
}

export default function HomePage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [farmerForm, setFarmerForm] = useState({ name: '', email: '', phone: '', crops: '' });
  const [dealerForm, setDealerForm] = useState({ name: '', email: '', phone: '', requirements: '' });

  useEffect(() => {
    async function fetchData() {
      const farmersRes = await fetch('/api/farmers');
      const dealersRes = await fetch('/api/dealers');
      const farmersData = await farmersRes.json();
      const dealersData = await dealersRes.json();
      setFarmers(farmersData.data);
      setDealers(dealersData.data);
    }
    fetchData();
  }, []);

  async function addFarmer(e: React.FormEvent) {
    e.preventDefault();
    const crops = farmerForm.crops.split(',').map((crop) => ({ name: crop.trim() }));
    await fetch('/api/farmers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...farmerForm, crops }),
    });
    setFarmerForm({ name: '', email: '', phone: '', crops: '' });
    window.location.reload(); // Refresh to show new data
  }

  async function addDealer(e: React.FormEvent) {
    e.preventDefault();
    const requirements = dealerForm.requirements.split(',').map((req) => ({ cropName: req.trim() }));
    await fetch('/api/dealers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...dealerForm, requirements }),
    });
    setDealerForm({ name: '', email: '', phone: '', requirements: '' });
    window.location.reload(); // Refresh to show new data
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Farmers & Dealers Portal</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Add Farmer</h2>
        <form onSubmit={addFarmer} className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={farmerForm.name}
            onChange={(e) => setFarmerForm({ ...farmerForm, name: e.target.value })}
            className="border p-2 mb-2 block"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={farmerForm.email}
            onChange={(e) => setFarmerForm({ ...farmerForm, email: e.target.value })}
            className="border p-2 mb-2 block"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={farmerForm.phone}
            onChange={(e) => setFarmerForm({ ...farmerForm, phone: e.target.value })}
            className="border p-2 mb-2 block"
            required
          />
          <input
            type="text"
            placeholder="Crops (comma-separated)"
            value={farmerForm.crops}
            onChange={(e) => setFarmerForm({ ...farmerForm, crops: e.target.value })}
            className="border p-2 mb-2 block"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4">
            Add Farmer
          </button>
        </form>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Add Dealer</h2>
        <form onSubmit={addDealer} className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={dealerForm.name}
            onChange={(e) => setDealerForm({ ...dealerForm, name: e.target.value })}
            className="border p-2 mb-2 block"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={dealerForm.email}
            onChange={(e) => setDealerForm({ ...dealerForm, email: e.target.value })}
            className="border p-2 mb-2 block"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={dealerForm.phone}
            onChange={(e) => setDealerForm({ ...dealerForm, phone: e.target.value })}
            className="border p-2 mb-2 block"
            required
          />
          <input
            type="text"
            placeholder="Requirements (comma-separated)"
            value={dealerForm.requirements}
            onChange={(e) => setDealerForm({ ...dealerForm, requirements: e.target.value })}
            className="border p-2 mb-2 block"
          />
          <button type="submit" className="bg-green-500 text-white py-2 px-4">
            Add Dealer
          </button>
        </form>
      </section>
    </div>
  );
}
