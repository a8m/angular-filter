'use strict';

describe('underscoreFilter', function () {

  var filter;

  beforeEach(module('a8m.underscore'));

  beforeEach(inject(function ($filter) {
    filter = $filter('underscore');
  }));

  it('should underscore valid strings', function() {
    expect(filter('ASimpleWord')).toEqual('a_simple_word');
    expect(filter('aMediumWordHere')).toEqual('a_medium_word_here');
    expect(filter('ANUPPERCASEDWORDHERE')).toEqual('a_n_u_p_p_e_r_c_a_s_e_d_w_o_r_d_h_e_r_e');
    expect(filter('alowercasedword')).toEqual('alowercasedword');
    expect(filter('  SOME WHITE SPACES  ')).toEqual('s_o_m_e_w_h_i_t_e_s_p_a_c_e_s');
    expect(filter('  SOME-WHITE-SPACES  ')).toEqual('s_o_m_e_w_h_i_t_e_s_p_a_c_e_s');
    expect(filter('1  SOME-WHITE-SPACES0  2')).toEqual('1_s_o_m_e_w_h_i_t_e_s_p_a_c_e_s02');

  });

  it('should not underscore invalid strings', function() {
    expect(filter(null)).not.toEqual('null');
    expect(filter(undefined)).not.toEqual('undefined');
  });

});
