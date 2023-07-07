import { useEffect, useState } from 'react';
import { client } from '../../clientHelpers/helpers';
import axios from 'axios';

const useFetch = (url: string) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const source = axios.CancelToken.source();
		setLoading(true);
		const fetchData = async () => {
			const response = await client.GET(url, source);
			setData(response);
			setLoading(false);
		};

		fetchData();

		return () => {
			source.cancel();
		};
	}, [url]);
	return { data, loading };
};

export default useFetch;
