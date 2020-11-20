//const { BehaviorTree, Sequence, Task, SUCCESS, FAILURE } = require('behtree')
import('behtree')
	.then((module) => {
		console.log(module);
		process.BehaviorTree = module;
		doIt();
	});

function doIt()
{
	const { BehaviorTree, Sequence, Task, SUCCESS, FAILURE } = process.BehaviorTree;
	BehaviorTree.register('bark', new Task({
	  run: function (dog) {
		dog.bark()
		return SUCCESS
	  }
	}))

	const tree = new Sequence({
	  nodes: [
		'bark',
		new Task({
		  run: function (dog) {
			dog.randomlyWalk()
			return SUCCESS
		  }
		}),
		'bark',
		new Task({
		  run: function (dog) {
			if (dog.standBesideATree()) {
			  dog.liftALeg()
			  dog.pee()
			  return SUCCESS
			} else {
			  return FAILURE
			}
		  }
		})
	  ]
	})

	class Dog {
	  bark () {
		console.log('*wuff*')
	  }

	  randomlyWalk () {
		console.log('The dog walks around.')
	  }

	  liftALeg () {
		console.log('The dog lifts a leg.')
	  }

	  pee () {
		console.log('The dog pees.')
	  }

	  standBesideATree () {
		return true
	  }
	}

	const dog = new Dog() // the nasty details of a dog are omitted

	const bTree = new BehaviorTree({
	  tree: tree,
	  blackboard: dog
	})

	// The "game" loop:
	setInterval(function () {
	  bTree.step()
	}, 1000 / 60)
}