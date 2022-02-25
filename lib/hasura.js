async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HAUSURA_ADMIN_URL, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await result.json();
}

export async function isNewUserQuery(issuer, token) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      issuer
      id
      publicAddress
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );
  return response.data.users.length === 0;
}

export async function createNewUserMutation(metadata, token) {
  const operationsDoc = `
  mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        issuer
        publicAddress
      }
    }
  }
`;
  const { email, issuer, publicAddress } = metadata;
  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { email, issuer, publicAddress },
    token
  );
  return response.data.users[0];
}

export async function findVideoByIdAndUserIdQuery(videoId, userId, token) {
  const operationsDoc = `
  query findVideoByIdAndUserId($videoId: String!, $userId: String!) {
    stats(where: {videoId: {_eq: $videoId}, userId: {_eq: $userId}}) {
      favorited
      id
      userId
      videoId
      watched
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoByIdAndUserId",
    { videoId, userId },
    token
  );
  return response.data.stats[0];
}

export async function addStatMutation(
  { favorited, userId, videoId, watched },
  token
) {
  const operationsDoc = `
  mutation addStat($favorited: Int, $userId: String!, $videoId: String!, $watched: Boolean) {
    insert_stats(objects: {favorited: $favorited, userId: $userId, videoId: $videoId, watched: $watched}) {
      returning {
        favorited
        id
        userId
        videoId
        watched
      }
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "addStat",
    { favorited, userId, videoId, watched },
    token
  );
  return response.data;
}

export async function updateStatMutation(
  { favorited, userId, videoId, watched },
  token
) {
  const operationsDoc = `
  mutation updateStat($favorited: Int, $userId: String!, $videoId: String!, $watched: Boolean) {
    update_stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}, _set: {favorited: $favorited, watched: $watched}) {
      returning {
        favorited
        id
        userId
        videoId
        watched
      }
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "updateStat",
    { favorited, userId, videoId, watched },
    token
  );
  return response.data;
}

export async function getWatchedVideosQuery(userId, token) {
  const operationsDoc = `
  query getWatchedVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId}}) {
      videoId
      watched
    }
  }
`;
  const response = await queryHasuraGQL(
    operationsDoc,
    "getWatchedVideos",
    { userId },
    token
  );
  return response.data.stats;
}

export async function getMyListVideosQuery(userId, token) {
  const operationsDoc = `
  query getMyListVideos($userId: String!) {
    stats(where: {
      userId: {_eq: $userId}, 
      favorited: {_eq: 1}
    }) {
      videoId
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "getMyListVideos",
    { userId },
    token
  );

  return response.data.stats;
}
