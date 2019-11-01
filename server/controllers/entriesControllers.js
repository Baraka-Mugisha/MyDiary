import entriesModel from '../Models/entriesModel';
import userModel from '../Models/userModel';
import tokens from '../helpers/tokens';
import ReturnIt from '../helpers/returnIt';
import dispMessages from '../helpers/displayMessages';

const entryController = {
	createEntry(req, res) {
		const user = userModel.find((user) => user.email === tokens.decoded(req, res).email);

		if (!user) { return ReturnIt.Message(res, 401, dispMessages.signInFirst) }
		const date = new Date();

		const newEntry = {
			user_email: user.email,
			id: entriesModel[entriesModel.length - 1].id + 1,
			createdOn: `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`,
			title: req.body.title,
			description: req.body.description,
		};

		entriesModel.push(newEntry);
		const entryDisp = { ...newEntry };
		delete entryDisp.user_email;
		return ReturnIt.Success(res, 201, dispMessages.success, entryDisp );
	},
	viewEntries(req, res) {
		const user = userModel.find(user => user.email == tokens.decoded(req, res).email);
		const entryFound = entriesModel.filter(entry => entry.user_email == tokens.decoded(req, res).email);
		const entry = entryFound.sort((a, b) => b.id - a.id);

		if (user) {
			return entry.length !== 0 ? ReturnIt.Success(res, 200, dispMessages.success, entry) : ReturnIt.Error(res, 404, dispMessages.emptyEntry)
		}
		return ReturnIt.Message(res, 401, dispMessages.signInFirst);
	},
	viewSpecificEntry(req, res) {
		const user = userModel.find((user) => user.email === tokens.decoded(req, res).email);
		const id = req.params.entry_id;
		const entry = entriesModel.find((entry) => entry.id === parseInt(id, 10));
		if (user) {
			if (!entry) { 
				return ReturnIt.Message(res, 404, dispMessages.entryNotFound); 
			}
			const entryFound = user.email === entry.user_email;
			return entryFound ? ReturnIt.Success(res, 200, dispMessages.success, entry) : ReturnIt.Error(res, 401, dispMessages.entryNotYours);
		}
		return ReturnIt.Message(res, 401, dispMessages.signInFirst);
	},
	modifyEntry(req, res) {
		const user = userModel.find((user) => user.email === tokens.decoded(req, res).email);
		const id = req.params.entry_id;
		const { title, description } = req.body;

		const entry = entriesModel.find((entry) => entry.id === parseInt(id, 10));
		if (user) {
			if (!entry) { return ReturnIt.Error(res, 404, dispMessages.entryNotFound ); }

			if (entry.user_email === user.email) {
				const date = new Date();
				entriesModel.find((entry) => entry.id === parseInt(id, 10)).description = description;
				entriesModel.find((entry) => entry.id === parseInt(id, 10)).title = title;
				entriesModel.find((entry) => entry.id === parseInt(id, 10)).createdOn = `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`;
				return ReturnIt.Success(res, 200, dispMessages.entryEdited, { title, description });
			}
			return ReturnIt.Error(res, 401, dispMessages.editDenied);
		}
		return ReturnIt.Error(res, 401, dispMessages.signInFirst);
	},
	deleteEntry(req, res) {
		const user = userModel.find((user) => user.email === tokens.decoded(req, res).email);
		const id = req.params.entry_id;
		if (user) {
			const entry = entriesModel.find((entry) => entry.id === parseInt(id, 10));
			if (!entry) { return ReturnIt.Message(res, 404, dispMessages.entryNotFound); }

			if (entry.user_email === user.email) {
				const entry_index = entriesModel.indexOf(entry);
				entriesModel.splice(entry_index, 1);
				return ReturnIt.Message(res, 200,	dispMessages.entryDeleted);
			}
			return ReturnIt.Error(res, 401, dispMessages.deleteDenied );
		}
		return ReturnIt.Error(res, 401, dispMessages.signInFirst );
	},
}

export default entryController;
