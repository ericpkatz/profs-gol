const expect = require('chai').expect;
const GameOfLife = require('../GameOfLife');
const sinon = require('sinon');

describe('gol', ()=> {
  it('can be created', ()=> {
    const gol = new GameOfLife(3, 3);
    expect(gol).to.be.ok;
  });

  describe('make board', ()=> {
    it('can create a 2 x 2  board', ()=> {
      const gol = new GameOfLife(2, 2);
      expect(gol.board).to.eql([
        [ 0, 0 ],
        [ 0, 0 ]
      ]);
    });
    it('can create a 3 x 3  board', ()=> {
      const gol = new GameOfLife(3, 3);
      expect(gol.board).to.eql([
        [ 0, 0, 0 ],
        [ 0, 0, 0 ],
        [ 0, 0, 0 ]
      ]);
    });
  });

  describe('clear', ()=> {
    it('clears the board', ()=> {
      const gol = new GameOfLife(3, 3);
      gol.board[0][1] = 1;
      gol.clear();
      expect(gol.board).to.eql([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]);

    });
  });

  describe('livingNeighbors', ()=> {
    it('finds living neighbors', ()=> {
      const gol = new GameOfLife(2, 2);
      gol.board = [
        [0, 1],
        [1, 1 ]
      ];
      expect(gol.livingNeighbors(0,0)).to.equal(3);

    });
  });

  describe('tick', ()=> {
    it('dead and three living neighbors', ()=> {
      const gol = new GameOfLife(2, 2);
      gol.board = [
        [0, 1],
        [1, 1]
      ];

      gol.tick();
      expect(gol.board[0][0]).to.equal(1);
    });
    it('alive and three living neighbors', ()=> {
      const gol = new GameOfLife(2, 2);
      gol.board = [
        [0, 1],
        [1, 1]
      ];

      gol.tick();
      expect(gol.board[0][1]).to.equal(1);
    });
  });

  describe('randomize', ()=> {
    it('randomizes', ()=> {
      const stub = sinon.stub(Math, 'round').returns(1);
      const gol = new GameOfLife(3, 3);
      gol.randomize();
      expect(gol.board).to.eql([
        [ 1, 1, 1 ],
        [ 1, 1, 1 ],
        [ 1, 1, 1 ],
      ]);
      stub.reset();
    });
  });







});
