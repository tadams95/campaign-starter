import React, { Component, useState } from "react";
import Layout from "@/components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "@/ethereum/factory";
import web3 from "@/ethereum/web3";
import { useRouter } from 'next/router';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      //create a new campaign
      await factory.methods
        .createCampaign(minimumContribution)
        .send({
          from: accounts[0],
        });

      router.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create a campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="Wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) =>
              setMinimumContribution(event.target.value)
            }
          />
        </Form.Field>
        <Message error header="Uh-Oh!" content={errorMessage} />
        <Button primary loading={loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
