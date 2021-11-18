import md5 from 'crypto-js/md5';

export async function getToken() {
  try {
    const fetchResult = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await fetchResult.json();
    return token;
  } catch (err) {
    console.error(err);
  }
}

export function getGravatar(email) {
  const hashGrada = md5(email).toString();
  return `https://www.gravatar.com/avatar/${hashGrada}`;
}

export async function getQuestionsFetch() {
  const token = localStorage.getItem('token');
  try {
    const fetchResult = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const questions = await fetchResult.json();
    return questions;
  } catch (err) {
    console.error(err);
  }
}
