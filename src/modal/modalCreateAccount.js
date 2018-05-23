// React imports
import React, { Component } from "react";

// MaterialUI imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

// HTTP
import axios from "axios";

const baseUrlCowaboo = "http://groups.cowaboo.net/2018/group08/public/api";
const urlPostUserCowaboo = "/user?email=";
const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class ModalCreateAccount extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      open: false,
      emailCorrect: false,
      msgEmailIncorrect: false,
      emailDoesntExist: true,
      email: "",
      accountCreated: false,
      isFetching: false
    };

    //binds
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);


    //refs
}

  closeModal() {
    this.setState({ open: false, msgEmailIncorrect: false });
  }

  openModal() {
    this.setState({
      open: true, accountCreated: false
    });
  }

  handleCreateAccount() {
    if (regEmail.test(this.state.email)) {
      this.setState({ emailCorrect: true, isFetching: true });
      axios
        .post(baseUrlCowaboo + urlPostUserCowaboo + this.state.email)
        .then(response => {
          this.setState({ accountCreated: true, isFetching: false });
        })
        .catch(e => {
          this.setState({ emailDoesntExist: !e.response.status === 409 });
        });
    } else {
      this.setState({ emailCorrect: false, emailDoesntExist: true });
    }
  }

  // render
  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.closeModal}
        aria-labelledby="form-dialog-title"
        disableEnforceFocus
      >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        {!this.state.accountCreated && (
          <DialogContent>
            <DialogContentText>
              Merci de bien vouloir nous fournir votre adresse mail pour que
              nous puissions vous envoyer votre clé secrète.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              autoFocus
              onKeyUp={e => {
                this.setState({
                  email: e.target.value,
                  emailCorrect: regEmail.test(e.target.value),
                  msgEmailIncorrect: !regEmail.test(e.target.value)
                });
                if (e.keyCode === 13) {
                  this.state.accountCreated
                    ? this.closeModal()
                    : this.handleCreateAccount();
                }
              }}
              fullWidth
            />
            {this.state.msgEmailIncorrect && (
              <DialogContentText
                style={{ color: "red", fontSize: 12, fontStyle: "italic" }}
              >
                Email incorrect, merci de respecter le type de format suivant :
                exemple@exemple.com
              </DialogContentText>
            )}
            {!this.state.emailDoesntExist && (
              <DialogContentText
                style={{ color: "red", fontSize: 12, fontStyle: "italic" }}
              >
                Email déjà existant, merci d'en rentrer un autre.
              </DialogContentText>
            )}
          </DialogContent>
        )}
        {this.state.accountCreated && (
          <DialogContent>
            <DialogContentText>
              Nous vous remercions pour votre inscription. Un mail avec votre
              clé secrète va vous être envoyé.
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          {!this.state.accountCreated && (
            <Button onClick={this.closeModal} color="primary">
              Annuler
            </Button>
          )}
          {(this.state.isFetching && (
            <div>
              <CircularProgress style={{ alignSelf: "" }} size={20} />
            </div>
          )) || (
            <Button
              onClick={
                this.state.accountCreated
                  ? this.closeModal
                  : this.handleCreateAccount
              }
              color="primary"
              disabled={!this.state.emailCorrect}
            >
              Valider
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

export default ModalCreateAccount;
