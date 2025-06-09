import React, { useState } from 'react';
import { Mail, Users, Settings, Ticket, Edit, Trash2, Eye } from 'lucide-react';

const HackathonTicketSystem = () => {
  const [currentView, setCurrentView] = useState('registration');
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeader: {
      name: '',
      email: '',
      phone: ''
    },
    members: [
      { name: '', email: '', phone: '' },
      { name: '', email: '', phone: '' },
      { name: '', email: '', phone: '' }
    ]
  });

  const handleInputChange = (field, value, memberIndex = null, isLeader = false) => {
    if (isLeader) {
      setFormData(prev => ({
        ...prev,
        teamLeader: { ...prev.teamLeader, [field]: value }
      }));
    } else if (memberIndex !== null) {
      setFormData(prev => ({
        ...prev,
        members: prev.members.map((member, index) => 
          index === memberIndex ? { ...member, [field]: value } : member
        )
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const generateTicketId = () => {
    return 'HACK-' + Date.now().toString().slice(-6);
  };

  const simulateEmailSend = (ticketData) => {
    // In a real application, this would send an actual email
    console.log('Email sent to:', ticketData.teamLeader.email);
    console.log('Ticket details:', ticketData);
    return true;
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.teamName || !formData.teamLeader.name || !formData.teamLeader.email || !formData.teamLeader.phone) {
      alert('Please fill in all team leader details');
      return;
    }
    
    for (let i = 0; i < formData.members.length; i++) {
      if (!formData.members[i].name || !formData.members[i].email || !formData.members[i].phone) {
        alert(`Please fill in all details for Member ${i + 1}`);
        return;
      }
    }
    
    const ticketData = {
      id: generateTicketId(),
      ...formData,
      registrationDate: new Date().toLocaleDateString(),
      status: 'Registered'
    };

    if (simulateEmailSend(ticketData)) {
      setTickets(prev => [...prev, ticketData]);
      alert(`Ticket created successfully! Ticket ID: ${ticketData.id}\nConfirmation email sent to ${ticketData.teamLeader.email}`);
      
      // Reset form
      setFormData({
        teamName: '',
        teamLeader: { name: '', email: '', phone: '' },
        members: [
          { name: '', email: '', phone: '' },
          { name: '', email: '', phone: '' },
          { name: '', email: '', phone: '' }
        ]
      });
    }
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setFormData({
      teamName: ticket.teamName,
      teamLeader: ticket.teamLeader,
      members: ticket.members
    });
    setCurrentView('registration');
  };

  const handleUpdate = () => {
    // Validate required fields
    if (!formData.teamName || !formData.teamLeader.name || !formData.teamLeader.email || !formData.teamLeader.phone) {
      alert('Please fill in all team leader details');
      return;
    }
    
    for (let i = 0; i < formData.members.length; i++) {
      if (!formData.members[i].name || !formData.members[i].email || !formData.members[i].phone) {
        alert(`Please fill in all details for Member ${i + 1}`);
        return;
      }
    }
    
    const updatedTicket = {
      ...editingTicket,
      ...formData
    };

    setTickets(prev => prev.map(ticket => 
      ticket.id === editingTicket.id ? updatedTicket : ticket
    ));

    setEditingTicket(null);
    setFormData({
      teamName: '',
      teamLeader: { name: '', email: '', phone: '' },
      members: [
        { name: '', email: '', phone: '' },
        { name: '', email: '', phone: '' },
        { name: '', email: '', phone: '' }
      ]
    });
    
    alert('Ticket updated successfully!');
    setCurrentView('admin');
  };

  const handleDelete = (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
    }
  };

  const RegistrationForm = () => (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center gap-3 mb-6">
          <Ticket className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            {editingTicket ? 'Edit Registration' : 'Hackathon Registration'}
          </h1>
        </div>

        <div className="space-y-6">
          {/* Team Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Name *
            </label>
            <input
              type="text"
              required
              value={formData.teamName}
              onChange={(e) => handleInputChange('teamName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your team name"
            />
          </div>

          {/* Team Leader */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Leader Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.teamLeader.name}
                  onChange={(e) => handleInputChange('name', e.target.value, null, true)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.teamLeader.email}
                  onChange={(e) => handleInputChange('email', e.target.value, null, true)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.teamLeader.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value, null, true)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Team Members (3 members required)
            </h3>
            {formData.members.map((member, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h4 className="text-md font-medium text-gray-700 mb-3">
                  Member {index + 1}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={member.name}
                      onChange={(e) => handleInputChange('name', e.target.value, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={member.email}
                      onChange={(e) => handleInputChange('email', e.target.value, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={member.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value, index)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={editingTicket ? handleUpdate : handleSubmit}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5" />
              {editingTicket ? 'Update Registration' : 'Register & Send Ticket'}
            </button>
            {editingTicket && (
              <button
                type="button"
                onClick={() => {
                  setEditingTicket(null);
                  setFormData({
                    teamName: '',
                    teamLeader: { name: '', email: '', phone: '' },
                    members: [
                      { name: '', email: '', phone: '' },
                      { name: '', email: '', phone: '' },
                      { name: '', email: '', phone: '' }
                    ]
                  });
                  setCurrentView('admin');
                }}
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const AdminPanel = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <div className="text-sm text-gray-600">
            Total Registrations: {tickets.length}
          </div>
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No registrations yet</p>
            <p className="text-gray-400">Tickets will appear here once teams register</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                    Ticket ID
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                    Team Name
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                    Team Leader
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                    Email
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                    Registration Date
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 font-mono text-sm">
                      {ticket.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {ticket.teamName}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {ticket.teamLeader.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {ticket.teamLeader.email}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {ticket.registrationDate}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => alert(`Ticket Details:\n\nTeam: ${ticket.teamName}\nLeader: ${ticket.teamLeader.name}\nEmail: ${ticket.teamLeader.email}\nPhone: ${ticket.teamLeader.phone}\n\nMembers:\n${ticket.members.map((m, i) => `${i+1}. ${m.name} (${m.email})`).join('\n')}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(ticket)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ticket.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Hackathon Ticket System</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentView('registration')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentView === 'registration'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Registration
              </button>
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setEditingTicket(null);
                }}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentView === 'admin'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8">
        {currentView === 'registration' ? <RegistrationForm /> : <AdminPanel />}
      </main>
    </div>
  );
};

export default HackathonTicketSystem;
