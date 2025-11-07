import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';

const GET_WINES = gql`
  query GetWines($filter: String) {
    wines(filter: $filter) {
      id
      name
      type
      country
      grape
      year
      reviews {
        id
        rating
        comment
        user {
          name
        }
      }
    }
  }
`;

function WineList() {
  const [filter, setFilter] = useState('');
  const { loading, error, data } = useQuery(GET_WINES, {
    variables: { filter: filter || undefined },
  });

  if (loading) return <p className="text-center text-xl">Carregando vinhos...</p>;
  if (error) return <p className="text-red-500">Erro: {error.message}</p>;

  const wines = data?.wines || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Catálogo de Vinhos</h1>
        <Link
          to="/create-wine"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          + Adicionar Vinho
        </Link>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome, país ou tipo..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wines.map((wine) => {
          const avgRating = wine.reviews?.length
            ? (wine.reviews.reduce((sum, r) => sum + r.rating, 0) / wine.reviews.length).toFixed(1)
            : 0;

          return (
            <Link
              key={wine.id}
              to={`/wine/${wine.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{wine.name}</h3>
                <p className="text-gray-600">{wine.type}</p>
              </div>
              
              <div className="space-y-1 text-sm text-gray-500">
                <p>🌍 {wine.country}</p>
                {wine.grape && <p>🍇 {wine.grape}</p>}
                {wine.year && <p>📅 {wine.year}</p>}
              </div>

              {wine.reviews?.length > 0 && (
                <div className="mt-4 flex items-center">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="ml-2 font-semibold">{avgRating}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({wine.reviews.length} {wine.reviews.length === 1 ? 'avaliação' : 'avaliações'})
                  </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {wines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">Nenhum vinho encontrado</p>
        </div>
      )}
    </div>
  );
}

export default WineList;
