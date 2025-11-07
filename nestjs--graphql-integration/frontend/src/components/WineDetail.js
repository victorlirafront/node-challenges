import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_WINE = gql`
  query GetWine($id: ID!) {
    wine(id: $id) {
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
        createdAt
        user {
          name
        }
      }
    }
  }
`;

function WineDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_WINE, {
    variables: { id },
  });

  if (loading) return <p className="text-center text-xl">Carregando...</p>;
  if (error) return <p className="text-red-500">Erro: {error.message}</p>;

  const wine = data?.wine;
  if (!wine) return <p>Vinho não encontrado</p>;

  return (
    <div>
      <Link to="/" className="text-purple-600 hover:underline mb-4 inline-block">
        ← Voltar ao catálogo
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{wine.name}</h1>
        
        <div className="space-y-2 mb-6">
          <p className="text-gray-600"><strong>Tipo:</strong> {wine.type}</p>
          <p className="text-gray-600">🌍 <strong>País:</strong> {wine.country}</p>
          {wine.grape && <p className="text-gray-600">🍇 <strong>Uva:</strong> {wine.grape}</p>}
          {wine.year && <p className="text-gray-600">📅 <strong>Ano:</strong> {wine.year}</p>}
        </div>

        <Link
          to={`/create-review/${wine.id}`}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition inline-block mb-6"
        >
          + Adicionar Avaliação
        </Link>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Avaliações ({wine.reviews?.length || 0})
          </h2>

          {wine.reviews && wine.reviews.length > 0 ? (
            <div className="space-y-4">
              {wine.reviews.map((review) => (
                <div key={review.id} className="border-l-4 border-purple-500 pl-4 py-2">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-2 font-semibold">{review.rating}/5</span>
                    <span className="ml-4 text-sm text-gray-500">{review.user.name}</span>
                    <span className="ml-auto text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma avaliação ainda</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WineDetail;
