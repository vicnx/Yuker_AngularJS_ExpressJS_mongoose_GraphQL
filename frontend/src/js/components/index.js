import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

// import ArticlePreview from './article-helpers/article-preview.component';
// componentsModule.component('articlePreview', ArticlePreview);

// import ArticleList from './article-helpers/article-list.component';
// componentsModule.component('articleList', ArticleList);



import ListPagination from './article-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);


//NOTICIAS
import NoticiasList from './noticias-helpers/noticias-list.component';
componentsModule.component('noticiasList', NoticiasList);

import NoticiasDetail from './noticias-helpers/noticias-details.component';
componentsModule.component('noticiasDetail', NoticiasDetail);

//YUKS
import YuksPreview from './yuks-helpers/yuks-preview.component';
componentsModule.component('yuksPreview', YuksPreview);

import YuksList from './yuks-helpers/yuks-list.component';
componentsModule.component('yuksList', YuksList);

import YuksDetail from './yuks-helpers/yuks-details.component';
componentsModule.component('yuksDetail', YuksDetail);

//botones
import LikeBtn from './buttons/like-btn.component';
componentsModule.component('likeBtn', LikeBtn);
import DislikeBtn from './buttons/dislike-btn.component';
componentsModule.component('dislikeBtn', DislikeBtn);

import YukActions from './actions/yuk-actions.component';
componentsModule.component('yukActions', YukActions);


export default componentsModule;
