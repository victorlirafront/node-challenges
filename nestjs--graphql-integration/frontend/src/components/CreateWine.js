import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CREATE_WINE = gql`
  mutation CreateWine($createWineInput: CreateWineInput!) {
    createWine(createWineInput: $createWineInput) {
      id
      name
      type
      country
    }
  }
`;

function CreateWine() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    country: '',
    grape: '',
    year: '',
  });

  const [createWine, { loading, error }] = useMutation(CREATE_WINE, {
    onCompleted: () => navigate('/'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createWine({
      variables: {
        createWineInput: {
          ...formData,
          year: formData.year ? parseInt(formData.year) : null,
          grape: formData.grape || null,
        },
      },
    });
  };

  return (
    <div>
      <Link to="/" className="text-purple-600 hover:underline mb-4 inline-block">
        ← Voltar ao catálogo
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Adicionar Novo Vinho</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nome *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tipo *</label>
            <input
              type="text"
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: Tinto, Branco, Rosé"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">País *</label>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: Brasil, Itália, França"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Uva</label>
            <input
              type="text"
              value={formData.grape}
              onChange={(e) => setFormData({ ...formData, grape: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: Cabernet Sauvignon"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Ano</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: 2020"
            />
          </div>

          {error && (
            <div className="text-red-500 bg-red-50 p-3 rounded">
              Erro: {error.message}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salvar Vinho'}
            </button>
            <Link
              to="/"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateWine;
